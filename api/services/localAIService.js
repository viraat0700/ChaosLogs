const { pipeline, env } = require('@xenova/transformers');

// Configure for Vercel / serverless environments
if (process.env.VERCEL) {
    env.cacheDir = '/tmp';
}



class LocalAIService {
    constructor() {
        this.classifier = null;
        this.modelName = 'Xenova/mobilebert-uncased-mnli';
        this.categoryLabels = ['Maintenance', 'Logistics', 'Network', 'Security', 'General', 'Safety'];
        this.severityLabels = ['Critical', 'Medium', 'Low'];
        this.initPromise = null;
    }

    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            try {
                console.log('Local AI: Loading model pipeline...');
                this.classifier = await pipeline('zero-shot-classification', this.modelName);
                console.log('Local AI: Model loaded successfully.');
            } catch (error) {
                console.error('Local AI: Failed to load model:', error);
                this.initPromise = null; // Reset to allow retry
            }
        })();

        return this.initPromise;
    }

    async analyze(text) {
        await this.initPromise;

        if (!this.classifier) {
            console.warn('Local AI: Classifier not ready, returning null.');
            return null;
        }

        try {

            const catOutput = await this.classifier(text, this.categoryLabels, { hypothesis_template: "This event is about {}." });
            const topCategory = catOutput.labels[0];
            const catConfidence = catOutput.scores[0];

            console.log(`Local AI Category: "${text}" -> ${topCategory} (${(catConfidence * 100).toFixed(1)}%)`);


            const sevLabels = ['Emergency', 'Urgent', 'Routine'];
            const sevOutput = await this.classifier(text, sevLabels, { hypothesis_template: "The severity of this event is {}." });
            let topSeverityLabel = sevOutput.labels[0];
            const sevConfidence = sevOutput.scores[0];


            let mappedSeverity = 'Low';
            if (topSeverityLabel === 'Emergency') mappedSeverity = 'Critical';
            if (topSeverityLabel === 'Urgent') mappedSeverity = 'Medium';
            if (topSeverityLabel === 'Routine') mappedSeverity = 'Low';

            console.log(`Local AI Severity: "${text}" -> ${topSeverityLabel} [${mappedSeverity}] (${(sevConfidence * 100).toFixed(1)}%)`);

            return {
                category: topCategory,
                categoryConfidence: catConfidence,
                severity: mappedSeverity,
                severityConfidence: sevConfidence
            };
        } catch (error) {
            console.error('Local AI: Analysis failed:', error);
            return null;
        }
    }


    async analyzeSeverity(text) {
        await this.initPromise;
        if (!this.classifier) return null;
        try {
            const output = await this.classifier(text, this.severityLabels);
            return {
                label: output.labels[0],
                score: output.scores[0]
            };
        } catch (e) {
            console.error('Local AI: Severity analysis failed:', e);
            return null;
        }
    }
}

module.exports = new LocalAIService();

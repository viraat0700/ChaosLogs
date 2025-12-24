class Classifier {
    constructor() {
        this.categories = {
            maintenance: ['motor', 'engine', 'heat', 'overheat', 'rpm', 'vibration', 'broken', 'repair', 'smoke', 'voltage', 'battery', 'power', 'roof'],
            logistics: ['shipment', 'delay', 'vendor', 'truck', 'cargo', 'dispatch', 'arrived', 'inventory', 'stock', 'warehouse'],
            network: ['wifi', 'connection', 'latency', 'server', 'timeout', 'offline', 'password', 'login', 'access', 'network', 'tower', 'signal'],
            security: ['breach', 'camera', 'unauthorized', 'badge', 'door', 'alarm', 'theft', 'intruder', 'safety', 'accident', 'fall', 'fell', 'injury']
        };

        this.severityTriggers = {
            critical: ['fire', 'smoke', 'emergency', 'danger', 'immediate', 'fail', 'down', 'crash', 'breach', 'explode', '0%', 'dead', 'fell', 'fall', 'accident', 'injury', 'death'],
            medium: ['warning', 'slow', 'delay', 'leak', 'noise', 'retry', 'unstable', 'low'],
            low: ['note', 'check', 'update', 'routine', 'info', 'test']
        };
    }

    analyze(text) {
        const lowerText = text.toLowerCase();

        let detectedCategory = 'general';
        let maxScore = 0;


        for (const [category, keywords] of Object.entries(this.categories)) {
            let score = 0;
            keywords.forEach(word => {
                if (lowerText.includes(word)) score++;
            });
            if (score > maxScore) {
                maxScore = score;
                detectedCategory = category;
            }
        }


        let severity = 'low';
        for (const [level, triggers] of Object.entries(this.severityTriggers)) {

            if (level === 'critical' && triggers.some(t => lowerText.includes(t))) {
                severity = 'critical';
                break;
            }
            if (level === 'medium' && triggers.some(t => lowerText.includes(t))) {
                severity = 'medium';
            }
        }


        const words = lowerText.replace(/[^\w\s]/g, '').split(/\s+/);
        const tags = words.filter(w => w.length > 4 && !['about', 'after', 'again', 'below', 'could', 'every', 'first', 'found', 'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'plant', 'point', 'right', 'small', 'sound', 'spell', 'still', 'study', 'their', 'there', 'these', 'thing', 'think', 'three', 'water', 'where', 'which', 'world', 'write', 'would', 'should'].includes(w)).slice(0, 3);

        return {
            category: detectedCategory.charAt(0).toUpperCase() + detectedCategory.slice(1),
            severity: severity.charAt(0).toUpperCase() + severity.slice(1),
            tags: tags
        };
    }
}

module.exports = new Classifier();

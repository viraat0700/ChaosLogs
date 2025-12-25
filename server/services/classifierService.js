class ClassifierService {
    constructor() {
        this.categories = {
            'Mechanical': ['mechanical', 'motor', 'bearing', 'gear', 'belt', 'pump', 'vibration', 'noise', 'alignment', 'machine', 'mechanism', 'hydraulic', 'pneumatic', 'torque', 'rpm', 'wear', 'tear', 'broken', 'stuck', 'jam'],
            'Electrical': ['electrical', 'voltage', 'current', 'power', 'fuse', 'breaker', 'short', 'ground', 'cable', 'wire', 'circuit', 'relay', 'solenoid', 'capacitor', 'resistor', 'transformer', 'outage', 'blackout', 'volts', 'amps', 'watt', 'battery', 'charge'],
            'Safety': ['safety', 'emergency', 'stop', 'hazard', 'fire', 'gate', 'smoke', 'protection', 'injury', 'danger', 'warning', 'caution', 'accident', 'incident', 'compliance', 'regulation', 'osha', 'ppe', 'guard'],
            'Network': ['network', 'connection', 'latency', 'collision', 'timeout', 'packet', 'gateway', 'switch', 'wifi', 'internet', 'web', 'server', 'client', 'bandwidth', 'ping', 'ip', 'address', 'mac', 'vlan', 'port', 'dns', 'dhcp', 'offline', 'online', 'lag'],
            'Software': ['software', 'exception', 'error', 'crash', 'reboot', 'firmware', 'update', 'api', 'null', 'bug', 'glitch', 'patch', 'release', 'version', 'code', 'script', 'program', 'app', 'application', 'database', 'ui', 'gui', 'backend', 'frontend'],
            'Thermal': ['thermal', 'heat', 'temperature', 'fan', 'cooling', 'overheat', 'hot', 'cold', 'freeze', 'frozen', 'melt', 'melting', 'boil', 'boiling', 'celsius', 'fahrenheit', 'ambient', 'cooler', 'heater']
        };

        this.severities = {
            'Critical': ['explosion', 'fire', 'catastrophic', 'crash', 'fatal', 'broken', 'offline', 'emergency'],
            'Warning': ['high', 'low', 'fluctuation', 'noise', 'check', 'maintenance', 'service', 'overheat'],
            'Info': ['started', 'completed', 'status', 'update', 'log', 'ready', 'connected']
        };

        this.tags = [
            'maintenance', 'critical', 'efficiency', 'safety', 'production', 'hardware', 'software'
        ];
    }

    analyze(text) {
        const lowerText = text.toLowerCase();

        // Find Category
        let category = 'Uncategorized';
        let maxCategoryHits = 0;

        for (const [cat, keywords] of Object.entries(this.categories)) {
            const hits = keywords.reduce((count, kw) => count + (lowerText.includes(kw) ? 1 : 0), 0);
            if (hits > maxCategoryHits) {
                maxCategoryHits = hits;
                category = cat;
            }
        }

        // Find Severity
        let severity = 'Info';
        let maxSeverityHits = 0;

        for (const [sev, keywords] of Object.entries(this.severities)) {
            const hits = keywords.reduce((count, kw) => count + (lowerText.includes(kw) ? 1 : 0), 0);
            if (hits > maxSeverityHits) {
                maxSeverityHits = hits;
                severity = sev;
            }
        }

        // If no severity hits but key negative words exist, default to Warning
        if (severity === 'Info' && (lowerText.includes('error') || lowerText.includes('fail') || lowerText.includes('issue'))) {
            severity = 'Warning';
        }

        // Extract Tags
        const foundTags = this.tags.filter(tag => lowerText.includes(tag.toLowerCase()));

        // Add specific tags based on matches
        if (maxCategoryHits > 0) foundTags.push(category.toLowerCase());

        return {
            category,
            severity,
            tags: [...new Set(foundTags)]
        };
    }
}

module.exports = new ClassifierService();

let preGeneratedSequences = [];

function generateSequences(length) {
    const batchSize = 1000;
    const numbers = [...Array(10).keys()]; // [0-9]
    const totalSequences = Math.pow(10, length);

    for (let i = 0; i < totalSequences; i += batchSize) {
        const end = Math.min(i + batchSize, totalSequences);
        const result = [];

        for (let j = i; j < end; j++) {
            let currentSequence = [];
            let temp = j;

            for (let k = 0; k < length; k++) {
                currentSequence.push(numbers[temp % 10]);
                temp = Math.floor(temp / 10);
            }

            result.push(currentSequence.join('')); // Convert to string
        }

        preGeneratedSequences.push(...result); // Store all sequences
    }
}

self.onmessage = function(event) {
    const length = event.data;

    // Generate sequences only once when worker starts
    if (preGeneratedSequences.length === 0) {
        generateSequences(length);
    }

    // Send all pre-generated sequences back
    self.postMessage(preGeneratedSequences);

    // Notify when generation is complete
    if (preGeneratedSequences.length === Math.pow(10, length)) {
        self.postMessage({ complete: true });
    }
};

self.onmessage = function(event) {
    const length = event.data;
    const batchSize = 1000; // Smaller batch size
    const numbers = [...Array(10).keys()]; // [0-9]
    const result = [];
    const totalSequences = Math.pow(10, length);

    for (let i = 0; i < totalSequences; i += batchSize) {
        const end = Math.min(i + batchSize, totalSequences);
        
        for (let j = i; j < end; j++) {
            let currentSequence = [];
            let temp = j;

            for (let k = 0; k < length; k++) {
                currentSequence.push(numbers[temp % 10]);
                temp = Math.floor(temp / 10);
            }

            result.push(currentSequence.join('')); // Convert to string
        }

        // Send the current batch back to the main thread
        self.postMessage(result);
    }
};

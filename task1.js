// JavaScript version of the PowerOfTwoMaxHeap class for submission

class PowerOfTwoMaxHeap {
    constructor(branchingFactor) {
        if (branchingFactor < 1 || !Number.isInteger(branchingFactor)) {
            throw new Error("Branching factor must be a positive integer.");
        }
        this.branchingFactor = branchingFactor; // Number of children each node can have (2^x)
        this.heap = []; // Underlying array to store heap elements
    }

    // Helper method to get the parent index
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / Math.pow(2, this.branchingFactor));
    }

    // Helper method to get the child indices
    getChildIndices(parentIndex) {
        const firstChildIndex = parentIndex * Math.pow(2, this.branchingFactor) + 1;
        const lastChildIndex = firstChildIndex + Math.pow(2, this.branchingFactor) - 1;
        return Array.from(
            { length: Math.pow(2, this.branchingFactor) },
            (_, i) => firstChildIndex + i
        );
    }

    // Insert method
    insert(value) {
        this.heap.push(value); // Add to the end of the heap
        this.heapifyUp(this.heap.length - 1); // Restore heap property
    }

    // Pop max method
    popMax() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty.");
        }
        const max = this.heap[0];
        const lastElement = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = lastElement; // Move last element to root
            this.heapifyDown(0); // Restore heap property
        }
        return max;
    }

    // Heapify up (used during insertion)
    heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.heap[currentIndex] > this.heap[parentIndex]) {
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    // Heapify down (used during pop max)
    heapifyDown(index) {
        let currentIndex = index;
        while (true) {
            const childIndices = this.getChildIndices(currentIndex);
            let maxIndex = currentIndex;
            for (const childIndex of childIndices) {
                if (childIndex < this.heap.length && this.heap[childIndex] > this.heap[maxIndex]) {
                    maxIndex = childIndex;
                }
            }
            if (maxIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[currentIndex]];
                currentIndex = maxIndex;
            } else {
                break;
            }
        }
    }
}

// Example usage
const heap = new PowerOfTwoMaxHeap(2); // Example with branching factor 2^2 = 4
// heap.insert(10);
// heap.insert(20);
// heap.insert(15);
// heap.insert(30);
console.log(heap.popMax()); // Should print 30
console.log(heap.popMax()); // Should print 20

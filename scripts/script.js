document.addEventListener('DOMContentLoaded', () => {
    const squareBody = document.querySelector('.square-body');
    const resetBtn = document.querySelector('.btn-reset');
    const COLS = 5;

    function getBlocks() {
        return Array.from(squareBody.querySelectorAll('.block'));
    }

    function swapBlocks(blockA, blockB) {
        const blocks = getBlocks();
        const indexA = blocks.indexOf(blockA);
        const indexB = blocks.indexOf(blockB);

        [blocks[indexA], blocks[indexB]] = [blocks[indexB], blocks[indexA]];

        squareBody.innerHTML = '';
        blocks.forEach(block => squareBody.appendChild(block));
    }

    document.addEventListener('click', (e) => {
        const arrow = e.target.closest('.arrow');
        if (!arrow) return;

        const block = arrow.closest('.block');
        if (!block) return;

        const blocks = getBlocks();
        const currentIndex = blocks.indexOf(block);
        const row = Math.floor(currentIndex / COLS);
        const col = currentIndex % COLS;
        let targetIndex = -1;

        if (arrow.classList.contains('top') && row > 0) {
            targetIndex = currentIndex - COLS;
        } else if (arrow.classList.contains('bottom') && row < COLS - 1) {
            targetIndex = currentIndex + COLS;
        } else if (arrow.classList.contains('left') && col > 0) {
            targetIndex = currentIndex - 1;
        } else if (arrow.classList.contains('right') && col < COLS - 1) {
            targetIndex = currentIndex + 1;
        }

        if (targetIndex !== -1) {
            const targetBlock = blocks[targetIndex];
            swapBlocks(block, targetBlock);
        }
    });

    resetBtn.addEventListener('click', () => {
        const blocks = getBlocks();
        const sortedBlocks = blocks.slice().sort((a, b) => {
            const numA = parseInt(a.querySelector('.block-number').textContent);
            const numB = parseInt(b.querySelector('.block-number').textContent);
            return numA - numB;
        });

        squareBody.innerHTML = '';
        sortedBlocks.forEach(block => squareBody.appendChild(block));
    });
});

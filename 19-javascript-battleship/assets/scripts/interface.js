const createBoard = (data, display, player) => {
    display.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        display.appendChild(row);
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-coords', `${i}${j}`);

            if(data[i][j] === 'miss') {
                cell.classList.add('miss');

            } else if (data[i][j] === 'hit') {
                cell.classList.add('hit');

            }
            
            if (data[i][j] !== null && data[i][j] !== 'miss' && data[i][j] !== 'hit' && player === 'human') {
                cell.classList.add('ship');
            }

            row.appendChild(cell);
        }
    }
}

const dragAndDrop = (e) => {
    const target = e.target;
    
    if (target instanceof HTMLDivElement) {
        if (
            target.classList.contains('carrier') ||
            target.classList.contains('battleship') ||
            target.classList.contains('cruiser') ||
            target.classList.contains('submarine') ||
            target.classList.contains('destroyer')
        ) {
        const clone = target.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.zIndex = '1000';
        clone.style.transformOrigin = '20px 20px';
        document.body.append(clone);
        moveAt(e.pageX, e.pageY, clone);
        const rKeyPressHandler = createKeyPressHandler(clone);
        document.addEventListener('keydown', rKeyPressHandler);
        document.addEventListener('mousemove', handleMouseMove);
        clone.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', rKeyPressHandler);
            clone.remove();
            const elementBelow = document.elementFromPoint(
                e.clientX,
                e.clientY,
            )
            elementBelow.click();
        });
        }
    }
}

const createKeyPressHandler = (target) => {
    let direction = 'vertical';
    return function (e) {
        if (e.key === 'r') {
            if (direction === 'vertical') {
                target.style.transform = 'rotate(90deg)';
                direction = 'horizontal';
            } else {
                target.style.transform = 'rotate(0deg)';
                direction = 'vertical';
            }
        }
    };
}

const moveAt = (pageX, pageY, target) => {
    target.style.left = `${pageX - 20}px`;
    target.style.top = `${pageY - 20}px`;
}

const handleMouseMove = (e) => {
    const target = e.target;
    if (target instanceof HTMLDivElement) {
        if (
            target.classList.contains('carrier') ||
            target.classList.contains('battleship') ||
            target.classList.contains('cruiser') ||
            target.classList.contains('submarine') ||
            target.classList.contains('destroyer')
        ) {
            moveAt(e.pageX, e.pageY, target);
        }
    }
}

const readCoords = (cell) => {
    if (cell.classList.contains('cell') && cell.dataset.coords) {
        const coords = cell.dataset.coords;
        return [parseInt(coords[0]), parseInt(coords[1])];
    }
    throw new Error('Something went wrong');
}

const createMessageLogger = (target) => {
    return (message) => {
        target.innerHTML += `${message}<br>`;
        scrollToBottom(target);
    }
}

const scrollToBottom = (target) => {
    target.scrollTo({
        top: target.scrollHeight,
        behavior: 'smooth',
        left: 0
    });
}

export { 
    createBoard,
    dragAndDrop,
    readCoords,
    createMessageLogger
};
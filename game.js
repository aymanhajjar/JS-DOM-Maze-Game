window.onload = function() {
    var start = document.getElementById('start')
    var score = 0
    var status = document.getElementById('status')
    var boundaries = document.getElementsByClassName('boundary')
    var initial_top = start.style.top
    var initial_left = start.style.left
    var status = document.getElementById('status')
    var game = document.getElementById('game')
    var end = document.getElementById('end')

    var score_text = document.createElement('p');
    score_text.textContent = `Score: ${score}`;
    score_text.style.textAlign = 'center';
    score_text.id = 'score';
    status.insertAdjacentHTML('afterend', score_text.outerHTML);
    var score_element = document.getElementById('score')
    score_element.innerHTML += '<br> <h5>(Hover over the top left corner to start)</h5>'

    start.addEventListener('mouseover', gameStarted)
    start.addEventListener('click', resetGame)

    function gameStarted() {
        start.removeEventListener('mouseover', gameStarted)
        game.addEventListener('mouseleave', leftMaze)
        status.innerText = 'Game Started'
        document.addEventListener('mousemove', moveStart)
        end.addEventListener('mouseover', gameWon)
        
        for (var i = 0; i < boundaries.length; i++) {
            if(!boundaries[i].classList.contains('example'))
            boundaries[i].style.background = '#eeeeee';
        }
    }

    function moveStart(e){
        var box_left = game.offsetLeft;
        var box_top = game.offsetTop;
    
        // You should grab the box from the top left corner
        start.style.left = (e.pageX - box_left) + 'px';;
        start.style.top = (e.pageY - box_top) + 'px';

        var startRect = start.getBoundingClientRect();
        var endRect = end.getBoundingClientRect();

        for (var i=0; i<boundaries.length; i++) {
            var boundaryRect = boundaries[i].getBoundingClientRect();

            if ( startRect.left + startRect.width > boundaryRect.left 
                && startRect.left < boundaryRect.left + boundaryRect.width 
                && startRect.top + startRect.height > boundaryRect.top
                && startRect.top < boundaryRect.top + boundaryRect.height) {
                hitWall()
                    }
        }
        if ( startRect.left + startRect.width > endRect.left 
            && startRect.left < endRect.left + endRect.width 
            && startRect.top + startRect.height > endRect.top
            && startRect.top < endRect.top + endRect.height) {
            gameWon()
                }
    };

    function gameWon () {
        document.getElementById('status').innerText = 'You won!'
        score += 5
        restart()
    }

    function leftMaze() {
        document.getElementById('status').innerText = 'You cannot leave the maze! Start again.'
        restart()
    }

    function hitWall() {
        for (var i = 0; i < boundaries.length; i++) {
            if(!boundaries[i].classList.contains('example'))
            boundaries[i].style.background = '#ff8888';
        }
        score -= 10
        status.innerText = 'You lost!'
        restart()
    }

    function restart() {
        score_element.innerHTML = `Score: ${score}<br> <h5>(Hover over the top left corner to start)</h5>`;
        document.removeEventListener('mousemove', moveStart)
        start.style.left = initial_left
        start.style.top = initial_top
        start.addEventListener('mouseover', gameStarted)
        game.removeEventListener('mouseleave', leftMaze)
        end.removeEventListener('mouseover', gameWon)
    }

    function resetGame() {
        score = 0;
        restart()
    }
}

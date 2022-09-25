const board = (function () {

    const resultModal = document.querySelector('.modal')
    const resultModalWrapper = document.querySelector('.modal-wrapper');
    const restartBtn = document.getElementById('restart-btn');
    const boardBoxes = [...document.querySelectorAll(".checkbox")];
    const whoIsTurnNode = document.querySelector('.title-wrapper').lastElementChild

    boardBoxes.map(box => box.addEventListener("click", placeMarker));
    restartBtn.addEventListener('click', restart);

    let marker = "X"; 

    const resultProp = {
        won: 'Match won by',
        draw: "Match draw"
    }

    function placeMarker(e) {
        if (!e.target.textContent) {
            e.target.textContent = marker;
            e.target.classList.add('filled')
            checkResult();
            toggleMarker(marker);
        }
    }

    function toggleMarker(marker){
        if (marker === "X"){ 
            setMarker("O");
            return;
        }
        if (marker === "O"){ 
            setMarker("X")
            return;
        }
    }
    
    function setMarker(newMarker) {
        marker = newMarker;
        whoIsTurnNode.textContent = `${marker} turn`
        boardBoxes.map(box => box.setAttribute('data-marker', marker))
    }

    function checkResult() {
        check.checkRow();
        check.checkColumn();
        check.checkDiagonal();
        check.checkDraw();
    }

    function declareResult(result) {
        if(result === resultProp.won) {
            resultModal.firstElementChild.textContent = result + " " + marker;
        }
        if(result === resultProp.draw) {
            resultModal.firstElementChild.textContent = result;
        }
        resultModalWrapper.classList.remove('hidden');
        setTimeout(()=>{
            resultModal.style.opacity = 1
            resultModal.style.transform = `scale(1)`;
        },500)
    }

    function restart(){
        resultModal.style.opacity = 0;
        resultModal.style.transform = `scale(0.5)`;
        setTimeout(()=>{
            resultModalWrapper.classList.add('hidden');
        },500)
        boardBoxes.map(box => box.textContent = "");
        boardBoxes.map(box => box.classList.remove('filled'));
    }

    const check = (function(){

        function checkRow() {
            if (
                boardBoxes[0].textContent === marker &&
                boardBoxes[1].textContent === marker &&
                boardBoxes[2].textContent === marker
            ) {
                declareResult(resultProp.won)
            }
            if (
                boardBoxes[3].textContent === marker &&
                boardBoxes[4].textContent === marker &&
                boardBoxes[5].textContent === marker
            ) {
                declareResult(resultProp.won)
            }
            if (
                boardBoxes[6].textContent === marker &&
                boardBoxes[7].textContent === marker &&
                boardBoxes[8].textContent === marker
            ) {
                declareResult(resultProp.won)
            }
        }
    
        function checkColumn() {
            if (
                boardBoxes[0].textContent === marker &&
                boardBoxes[3].textContent === marker &&
                boardBoxes[6].textContent === marker
            ) {
                declareResult(resultProp.won);
            }
            if (
                boardBoxes[1].textContent === marker &&
                boardBoxes[4].textContent === marker &&
                boardBoxes[7].textContent === marker
            ) {
                declareResult(resultProp.won)
            }
            if (
                boardBoxes[2].textContent === marker &&
                boardBoxes[5].textContent === marker &&
                boardBoxes[8].textContent === marker
            ) {
                declareResult(resultProp.won)
            }
        }
        
        function checkDiagonal() {
            if(
                boardBoxes[0].textContent === marker && 
                boardBoxes[4].textContent === marker && 
                boardBoxes[8].textContent === marker
            ) { 
                declareResult(resultProp.won) 
            }
            if(
                boardBoxes[2].textContent === marker && 
                boardBoxes[4].textContent === marker && 
                boardBoxes[6].textContent === marker
            ) {
                declareResult(resultProp.won)
            }
        }
    
        function checkDraw() {
            let n = boardBoxes.filter(box => box.textContent === "").length;
            if (n === 0) {
                declareResult(resultProp.draw)
            }
        }
    
        return {checkRow, checkColumn, checkDiagonal, checkDraw}
    })()

    return {placeMarker, restart}

})();
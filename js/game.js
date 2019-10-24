function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function plot(dir, length) {
    var x,y, ogLen = length

    var plotting = []

    if (dir == 'r') {
        x = getRandomNumber(7-length)
        y = getRandomNumber(7)

        var row = document.querySelectorAll('.sea .row')[y].querySelectorAll('.square')
        var start = row[x]

        plotting.push(start)

        while (length > 1) {
            x++
            plotting.push(row[x])
            length--
        }


    } else {
        x = getRandomNumber(7)
        y = getRandomNumber(7-length)


        var row = document.querySelectorAll('.sea .row')[y].querySelectorAll('.square')
        var start = row[x]

        plotting.push(start)

        while (length > 1) {
            y++
            plotting.push(document.querySelectorAll('.sea .row')[y].querySelectorAll('.square')[x])
            length--
        }

    }

    if (checkPlots(plotting)) {
        plotShip(plotting)
    } else {
        plot(dir, ogLen)
    }



}

function plotShip(plots) {
    var shipId = getRandomNumber(99999999)
    plots[0].classList.add('start-' + shipId)
    plots.forEach(function (plot) {
        plot.classList.add('ship', 'ship-' + shipId)
    })
    plots[plots.length-1].classList.add('end-' + shipId)
}

function checkPlots(plots) {
    var canPlot = true
    plots.forEach(function (plot) {
        if (plot.classList.contains('ship')) {
            canPlot = false
        }
    })
    return canPlot
}

function getRandomDirection() {
    var directions = ['r', 'd']
    return directions[Math.floor(Math.random() * directions.length)]
}

plot(getRandomDirection(), 4)
plot(getRandomDirection(), 3)
plot(getRandomDirection(), 3)
plot(getRandomDirection(), 2)

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', function() {
        if (square.classList.contains('ship')) {
            square.classList.add('hit')
            if (isShipSunk(square)) {
                sinkShip(square)

                if (isAllSunk()) {
                    alert('Congratulations, you sunk all the ships!')
                }

            }
        } else {
            square.classList.add('miss')
        }
    })
})

function isShipSunk(square) {
    var sunk = true
    findShip(square).forEach(function (ship) {
        if(!ship.classList.contains('hit')) {
            sunk = false
        }
    })
    return sunk
}

function findShip(square) {
    var shipId = square.className.match(/ship-[0-9]+/g)[0]
    return document.querySelectorAll('.' + shipId)
}

function sinkShip(square) {
    findShip(square).forEach(function (ship) {
        ship.classList.add('sunk')
    })
}

function isAllSunk() {
    var isSunk = true
    document.querySelectorAll('.ship').forEach(ship => {
        if (!ship.classList.contains('sunk')) {
            isSunk = false
        }
    })
    return isSunk
}


function update() {
    $('#clock').html(moment().format('Do MMMM YYYY | h:mm:ss a'));
}

setInterval(update, 1000);
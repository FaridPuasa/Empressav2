function update() {
    $('#clock').html(moment().format('Do MMMM YYYY | h:mm a'));
}

setInterval(update, 1000);
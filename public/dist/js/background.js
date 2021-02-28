function handleChangeSelectBackground () {
    const checkboxes = document.getElementsByClassName('select-background');
    const selectedBackgroundId = [];
    for (var checkbox of checkboxes) {
        if (checkbox.checked === true) {
            selectedBackgroundId.push(checkbox.id);
        }
    }
    if (selectedBackgroundId.length != 6) {
        alert('Hãy chọn đúng 6 background');
    } else {
        $.post('/lacasabella/api/background/updateSelectedBackground', { selectedBackgroundId: selectedBackgroundId }, function(result) {
            console.log(result)
        })
    }
}
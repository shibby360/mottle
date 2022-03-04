fetch('words.txt').then(wordscall)
function wordscall(r) {
  r.text().then(function(t) {
    window.words = t.split('\n')
    document.querySelector('#loader').style.display = 'none'
    document.querySelector('#gameboard').style.display = 'block'
    document.querySelector('#keyboard').style.display = 'block'
  }
}

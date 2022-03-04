var rowindex = 1
var infor = document.querySelector('#infomenu')
var done = false
fetch('words.txt').then(wordscall)
function wordscall(r) {
  r.text().then(function(t) {
    window.words = t.split('\n')
    document.querySelector('#loader').style.display = 'none'
    document.querySelector('#gameboard').style.display = 'block'
    document.querySelector('#keyboard').style.display = 'flex'
    document.querySelector('#content').style.display = 'block'
    window.now_word = words[Math.floor(Math.random() * words.length)]
  })
}
function getButtonByLetter(letter) {
  var btns = Array.from(document.querySelector('#keyboard').children)
  for(var i in btns) {
    if(btns[i].innerText === letter) {
      return btns[i]
    }
  }
}
var letterfunc = function(letter) {
  var ev = {key:letter}
  if(done) {
    return
  }
  var div = document.querySelector('#gameboard > #row'+rowindex)
  var children = Array.from(div.children)
  if(/^[a-zA-Z]$/.test(ev.key)) {
    for(var i in children) {
      var child = div.children[i]
      if(child.innerText === '') {
        child.innerText = ev.key
        break
      }
    }
  } else if(ev.key === 'Enter' || ev.key === 'entrez') {
    infor.innerText = ''
    var word = ''
    for(var i in children) {
      word += children[i].innerText
    }
    word = word.toLowerCase()
    if(word.length === 5) {
      if(!words.includes(word)) {
        infor.innerText = 'Ce n\'est pas un mot'
      } else {
        console.log(now_word)
        for(var i in children) {
          var child = children[i]
          var lett = child.innerText.toLowerCase()
          if(now_word.includes(lett)) {
            var lettind = word.indexOf(lett)
            if(now_word.charAt(lettind) === lett) {
              getButtonByLetter(child.innerText).style.background = 'green'
              child.style.background = 'green'
            } else {
              getButtonByLetter(child.innerText).style.background = 'yellow'
              child.style.background = 'yellow'
            }
          } else {
            getButtonByLetter(child.innerText).style.background = 'gray'
            child.style.background = 'gray'
          }
        }
        var correct = children.every(function(e) {
          return e.style.background === 'green'
        })
        if(correct) {
          done = true
          infor.innerText = 'Bon travaille!'
        } else {
          if(rowindex === 5) {
            infor.innerText = 'Le mot est ' + now_word
          }
        }
        rowindex ++;
      }
    } else {
      infor.innerText = 'Le mot n\'a pas cinq lettres'
    }
  }
}
function keydownr(keyt) {
  var ev = {key:keyt}
  var div = document.querySelector('#gameboard > #row'+rowindex)
  var children = Array.from(div.children)
  console.log(ev.key)
  if(ev.key === 'Backspace' || ev.key === 'effacez') {
    for(var i = children.length-1; i >= 0; i--) {
      if(children[i].innerText !== '') {
        children[i].innerText = ''
        break
      }
    }
  }
}
addEventListener('keypress', (ev) => { letterfunc(ev.key) })
addEventListener('keydown', (ev) => { keydownr(ev.key) })
var btns = Array.from(document.querySelector('#keyboard').children)
for(var i in btns) {
  if(btns[i].innerText !== 'effacez') {
    btns[i].addEventListener('click', function(ev) {
      letterfunc(ev.target.innerHTML.toLowerCase())
    })
  } else {
    btns[i].addEventListener('click', (ev) => { keydownr(ev.target.innerHTML.toLowerCase()) })
  }
}

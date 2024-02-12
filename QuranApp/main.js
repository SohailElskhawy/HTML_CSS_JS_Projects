const firstPage = document.querySelector('.firstPage');
const secondPage = document.querySelector('.secondPage');
const surasInput = document.querySelector('.surasInput');
const readButton = document.querySelector('.readButton');
const suraName = document.querySelector('.suraName');
const suraContent = document.querySelector('.suraContent');
const suraList = document.querySelector('.suraList');

document.addEventListener('DOMContentLoaded', ()=> {
    displaySurasButtons();
})

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        const currentAya = document.querySelector('.active');
        if(currentAya) {
            currentAya.querySelector('.playButton').click();
        }
    }
})

async function getSura(suraNumber) {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${suraNumber}/ar.alafasy`);
    const data = await response.json();
    return data.data;
}

async function displaySura(sura) {
    firstPage.style.display = 'none';
    secondPage.style.display = 'block';
    suraName.textContent = sura.englishName;
    document.querySelector('.numOfAyas').innerHTML = `Number of Ayas: ${sura.numberOfAyahs}`;
    document.querySelector('.suraRevelation').innerHTML = `Revelation Type: ${sura.revelationType}`;
    const ayahs = sura.ayahs;
    for(let ayah of ayahs) {
        const ayahCard = document.createElement('div');
        ayahCard.classList.add('ayahCard');
        const ayahDiv = document.createElement('div');
        ayahDiv.classList.add('ayahDiv');
        const ayahText = document.createElement('p');
        ayahText.classList.add('ayahText');
        ayahText.textContent = ayah.text + ` (${replaceEnglishNumToArabic(ayah.numberInSurah.toString())})`;
        ayahDiv.appendChild(ayahText);
        ayahCard.appendChild(ayahDiv);
        const audio = document.createElement('audio');
        audio.src = ayah.audio;
        ayahCard.appendChild(audio);
        const playButton = document.createElement('button');
        playButton.classList.add('playButton');
        playButton.textContent = 'Play';
        playButton.addEventListener('click', function() {
            if(audio.paused) {
                audio.play();
                playButton.textContent = 'Pause';
            } else {
                audio.pause();
                document.querySelector('.playFullSurahBut').style.display = 'block';
                document.querySelector('.nextAyaButton').style.display = 'flex';
                document.querySelector('.prevAyaButton').style.display = 'flex';
                document.querySelectorAll('.ayahCard').forEach(aya => {
                    aya.querySelector('.playButton').textContent = 'Play';
                });
            }
            audio.onended = function() {
                playButton.textContent = 'Play';
            };
        });

        ayahCard.appendChild(playButton);

        suraContent.appendChild(ayahCard);
    }
    if(sura.number != 1) {
        const allAyas = document.querySelectorAll('.ayahCard');
        allAyas[0].querySelector('.ayahDiv .ayahText').textContent = allAyas[0].querySelector('.ayahDiv .ayahText').textContent.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '');
    }
    
    if (sura.number == 95){
        const allAyas = document.querySelectorAll('.ayahCard');
        allAyas[0].querySelector('.ayahDiv .ayahText').textContent = allAyas[0].querySelector('.ayahDiv .ayahText').textContent.replace('بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '')
    }

}

const backButton = document.querySelector('.backButton');
backButton.addEventListener('click', function() {
    window.location.reload();
});

const playFullButton = document.querySelector('.playFullSurahBut');
playFullButton.addEventListener('click', playFullSurah);

function playFullSurah(){
    const allAyas = document.querySelectorAll('.ayahCard');
    document.querySelector('.nextAyaButton').style.display = 'none';
    document.querySelector('.prevAyaButton').style.display = 'none';
    allAyas[0].classList.add('active');
    for(let aya of allAyas) {
        aya.classList.remove('active');
    }
    playFullButton.style.display = 'none';
    let currentAya = 0;
    playAya(allAyas, currentAya);
}

function playAya(allAyas, currentAya) {
    if(currentAya < allAyas.length) {
        allAyas[currentAya].querySelector('.playButton').click();
        allAyas[currentAya].classList.add('active');
        const audio = allAyas[currentAya].querySelector('audio');
        audio.onended = function() {
            allAyas[currentAya].classList.remove('active');
            currentAya++;
            playAya(allAyas, currentAya);
        };
    }else{
        let currentAya = 0;
        allAyas[currentAya].classList.add('active');
        document.querySelector('.nextAyaButton').style.display = 'flex';
        document.querySelector('.prevAyaButton').style.display = 'flex';
        document.querySelectorAll('.ayahCard').forEach(aya => {
            aya.querySelector('.playButton').textContent = 'Play';
        });
        playFullButton.style.display = 'block';
    }
}

const nextAyaButton = document.querySelector('.nextAyaButton');
nextAyaButton.addEventListener('click', nextAya);

function nextAya() {
    const currentAya = document.querySelector('.active');
    if(currentAya.nextElementSibling) {
        currentAya.classList.remove('active');
        currentAya.nextElementSibling.classList.add('active');
    }
}

const prevAyaButton = document.querySelector('.prevAyaButton');
prevAyaButton.addEventListener('click', prevAya);

function prevAya() {
    const currentAya = document.querySelector('.active');
    if(currentAya.previousElementSibling) {
        currentAya.classList.remove('active');
        currentAya.previousElementSibling.classList.add('active');
    }
}

function replaceEnglishNumToArabic(str){
    const englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    for(let i = 0; i < englishNumbers.length; i++){
        str = str.replaceAll(englishNumbers[i], arabicNumbers[i]);
    }
    return str;
}

async function displaySurasButtons() {
    const response = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await response.json();
    const suras = data.data;
    for(let sura of suras) {
        const suraButton = document.createElement('button');
        suraButton.classList.add('suraButton');
        suraButton.textContent = sura.englishName;
        suraButton.addEventListener('click', async function() {
            document.querySelectorAll('.suraButton').forEach(but => but.disabled = true)
            const selectedsura = await getSura(sura.number);
            console.log(selectedsura);
            await displaySura(selectedsura);
            const allAyas = document.querySelectorAll('.ayahCard');
            allAyas[0].classList.add('active');
            document.addEventListener('keydown', function(e) {
                if(e.key === 'ArrowRight') {
                    nextAya()
                }
                if(e.key === 'ArrowLeft') {
                    prevAya()
                }
            });
        });
        suraList.appendChild(suraButton);
    }
}
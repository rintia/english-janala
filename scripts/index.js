const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLessons(json.data))
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const createElements=(arr) =>{
    const htmlElements = arr.map(el => `<span class="btn bg-[#00BCFF20]">${el}</span>`);
    return htmlElements.join(' ')

}

const loadLevelWords = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active')
            displayLevelWords(data.data)
        })
}

const removeActive = () =>{
    const allBtn = document.querySelectorAll('.lesson-btn');
    allBtn.forEach(btn => btn.classList.remove('active'))
}

loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
   const res = await fetch(url)
   const details = await res.json();
   displayWordDetail(details.data);
}

// "data": {
// "word": "Grateful",
// "meaning": "কৃতজ্ঞ",
// "pronunciation": "গ্রেটফুল",
// "level": 3,
// "sentence": "I am grateful for your help.",
// "points": 3,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "thankful",
// "appreciative",
// "obliged"
// ],
// "id": 7

const manageSpinner =(status) =>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    } else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('word-container').classList.remove('hidden')
    }
}


const displayWordDetail =(word) =>{
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
        <div class="text-2xl font-bold">
                    <h2>${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
                </div>
                <div >
                    <h2 class="text-xl font-bold">Meaning</h2>
                    <p class="font-bangla text-xl font-semibold">${word.meaning}</p>
                </div>
                <div>
                    <h2 class="text-xl font-bold">Example</h2>
                    <p class="text-lg font-semibold">${word.sentence}</p>
                </div>
                <div>
                    <h2  class="text-xl font-bold">সমার্থক শব্দ গুলো</h2>
                    <p class="space-x-2">
                        ${createElements(word.synonyms)}
                    </p>
                </div>
    `

    document.getElementById('word_detail').showModal();
}

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-3 py-20 space-y-8 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `
        manageSpinner(false)
        return;
    }

    words.forEach(word => {
        card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white py-10 px-5 rounded-lg shadow-sm text-center space-y-4 h-full">
            <h2 class="text-2xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায় নি'}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl">" ${word.meaning ? word.meaning: 'অর্থ পাওয়া যায় নি' } / ${word.pronunciation ? word.pronunciation :'Pronunciation পাওয়া যায় নি'}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick='pronounceWord("${word.word}")' class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
      
    });
      manageSpinner(false)
}

//  {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayLessons = (lessons) => {

    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div')

        btnDiv.innerHTML = `
        <button id='lesson-btn-${lesson.level_no}' onclick= 'loadLevelWords(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Level -${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv)
    }
}

loadLessons();

document.getElementById('btn-search').addEventListener('click', ()=>{
    removeActive();
    const input = document.getElementById('input-search')
    const inputValue = input.value.trim().toLowerCase();

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(inputValue));
        displayLevelWords(filterWords);
    })
})
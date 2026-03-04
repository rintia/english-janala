const loadLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const loadLevelWords =(id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data.data))
}

const displayLevelWords =(words) =>{
    console.log(words);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML ='';

    words.forEach(word => {
        card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white py-10 px-5 rounded-lg shadow-sm text-center space-y-4">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl">" ${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
    });
}

//  {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayLessons =(lessons) =>{
    
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML ='';

    for(let lesson of lessons ){
        const btnDiv = document.createElement('div')

        btnDiv.innerHTML =`
        <button onclick= 'loadLevelWords(${lesson.level_no})' class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Level -${lesson.level_no}</button>
        `
    levelContainer.append(btnDiv)
    }
}

loadLessons();
function toggleHidden(domNode) {
    if(domNode.classList.contains("hidden")){
        domNode.classList.remove("hidden");
    }
    else {
        domNode.classList.add("hidden");
    }
}

const generateCaption = (dogBreedName, supCat) => {
    let caption = "This is ";
    const firstChar =  dogBreedName[0];

    if(firstChar === "a" || firstChar === 'i' || 
        firstChar === "e" ||  firstChar === "o" || 
        firstChar === "u"){
            caption += "an ";
    }
    else {
        caption += "a ";
    }

    if(supCat) {
        caption += dogBreedName + " (" + supCat + ")";
    }
    else {
        caption += dogBreedName;
    }

    return caption;
}

const addBreedImg = (link, dogBreedName, supCat) => {
    const photosSection = document.querySelector(".photos");
    const caption = generateCaption(dogBreedName, supCat);

    const figure = document.createElement("figure");
    figure.classList.add("photo");
    figure.classList.add("swiper-slide");
    
    const img = document.createElement("img");
    img.src = link;
    img.alt = caption;

    const figCaption = document.createElement("figcaption");
    figCaption.innerText = caption;

    figure.appendChild(img);
    figure.appendChild(figCaption);

    photosSection.appendChild(figure);
    

} 

function generateDogLink(dogName, catName) {
    let link = "https://dog.ceo/api/breed/";
    if(catName) {
        link += catName + "/" + dogName;
    }
    else {
        link += dogName; 
    }

    link += "/images/random";

    return link
}

const fetchDog = (dogName, supCat) => {
    fetch(generateDogLink(dogName, supCat))
            .then(res => res.json())
            .then(data => {
                const link  = data.message;
                addBreedImg(link, dogName, supCat);
            });
}

const createSingleCatLi = (dog) => {
    const li = document.createElement("li");
    
    li.classList.add("hidden");
    
    const btn = document.createElement("button");

    btn.innerText = dog;
    btn.classList.add("single-cat");

    btn.addEventListener("click", () => {
        const photos = document.querySelector(".photos");

        photos.innerHTML = "";
        
        fetchDog(btn.innerText);

        hideMenu();
    });

    li.appendChild(btn);

    return li;
}

const createTitleButton = (catName) => {
    const btn = document.createElement("button");

    btn.classList.add("big-cat");
    const h4 = document.createElement("h4");
    h4.innerText = catName;
    btn.appendChild(h4);
    
    btn.addEventListener("click", () => {
        const ul = btn.nextElementSibling;

        toggleHidden(ul);
    });
    return btn;
}


const createSubList = (dogs, catName) => {
    const ul = document.createElement("ul");
    ul.classList.add("hidden");

    dogs.forEach(d => {
        const subLi = document.createElement("li");

        const subBtn = document.createElement("button");
        subBtn.classList.add("sub-cat");
        subBtn.innerText = d;

        subBtn.addEventListener('click', (e) => {
            const photos = document.querySelector(".photos");

            photos.innerHTML = "";
        
            fetchDog(subBtn.innerText, catName);

            hideMenu();
        });


        subLi.appendChild(subBtn);
        ul.appendChild(subLi);
    });

    return ul;
}

const createBigCatLi = (catName, dogs) => {
    const li = document.createElement("li");
    
    li.classList.add("hidden");

    const titleBtn = createTitleButton(catName);
    li.appendChild(titleBtn);

    const subList = createSubList(dogs, catName);
    li.appendChild(subList);

    return li;
}


function addDogNames(dogsListUL) {
    fetch(" https://dog.ceo/api/breeds/list/all")
            .then(response => response.json())
            .then(data => {
                const dogsList = data.message;

                for(const dog in dogsList) {
        
                    if(dogsList[dog].length === 0){
                        const li = createSingleCatLi(dog);
                        dogsListUL.appendChild(li);
            
                    }
                    else {
                        const li = createBigCatLi(dog, dogsList[dog]);
                        dogsListUL.appendChild(li);
                    }
                    
                }
            });
    
}


function hideMenu(){
    const singleCatBtns = document.getElementsByClassName("single-cat");

    for(let i = 0; i < singleCatBtns.length; i++) {
        const li = singleCatBtns[i].parentNode;
        li.classList.add("hidden");
    }

    const bigCatBtns = document.getElementsByClassName("big-cat");

    for(let i = 0; i < bigCatBtns.length; i++){
        const li = bigCatBtns[i].parentNode;
        li.classList.add("hidden");

    }
}

function toggleMenu() {
    const singleCatBtns = document.getElementsByClassName("single-cat");

    for(let i = 0; i < singleCatBtns.length; i++) {
        const li = singleCatBtns[i].parentNode;
        toggleHidden(li);
    }

    const bigCatBtns = document.getElementsByClassName("big-cat");

    for(let i = 0; i < bigCatBtns.length; i++){
        const li = bigCatBtns[i].parentNode;
        toggleHidden(li);

    }
}

function addSwipper() {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
       

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }

    });

}



const init = () => {
    const dogsListUL = document.querySelector(".dogs-list");
    addDogNames(dogsListUL);

    document.querySelector(".add-dog").addEventListener('click', toggleMenu);


}

init();
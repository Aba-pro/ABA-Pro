// Sélection des éléments
const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdown-menu');
const shareImageButton = document.getElementById('shareImageButton');
const galleryContainer = document.querySelector('.gallery-container');

// Gérer l'ouverture/fermeture du menu hamburger
menuIcon.addEventListener('click', (event) => {
    dropdownMenu.classList.toggle('visible');
    event.stopPropagation();
});

// Fermer le menu lorsque l'on clique ailleurs
document.body.addEventListener('click', (event) => {
    if (!dropdownMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        dropdownMenu.classList.remove('visible');
    }
});
// Redirection vers la page add.html pour partager une image
shareImageButton.addEventListener('click', () => {
    window.location.href = 'add.html';
});

// Publier une image (dans add.html)
if (window.location.pathname.includes('add.html')) {
    const publishButton = document.getElementById('publishButton');
    const imageForm = document.getElementById('imageForm');

    publishButton.addEventListener('click', () => {
        const author = document.getElementById('author').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image').files[0];

        if (!author || !description || !imageFile) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
         // Lire l'image et la convertir en base64
         const reader = new FileReader();
         reader.onload = function () {
             const newPhotoItem = `
                 <div class="photo-item">
                     <p class="author">Auteur : ${author}</p>
                     <p class="description">${description}</p>
                     <img src="${reader.result}" alt="Image ajoutée" class="image">
                     <div class="actions">
                         <button class="like-button" data-liked="false">☆ J'aime <span class="like-count">0</span></button>
                         <button class="share-button">Partager</button>
                         <button class="save-button">Enregistrer</button>
                     </div>
                 </div>`;
             
             // Stocker la publication dans le localStorage
             const currentGallery = localStorage.getItem('gallery') || '';
             localStorage.setItem('gallery', currentGallery + newPhotoItem);
 
             // Rediriger vers index.html
             window.location.href = 'index.html';
         };
         reader.readAsDataURL(imageFile);
     });
 }
 // Charger les publications sur index.html
 if (window.location.pathname.includes('index.html')) {
     const savedGallery = localStorage.getItem('gallery');
     if (savedGallery) {
         galleryContainer.innerHTML = savedGallery;
     }
 }
     // Fonctionnalité "Partager"
     if (event.target.classList.contains('share-button')) {
         const image = event.target.closest('.photo-item').querySelector('.image');
         const imageSrc = image.src;
         alert(`Lien de partage généré : ${imageSrc}`);
     }
 
     // Fonctionnalité "Enregistrer"
     if (event.target.classList.contains('save-button')) {
         const image = event.target.closest('.photo-item').querySelector('.image');
         const link = document.createElement('a');
         link.href = image.src;
         link.download = 'image.png';
         link.click();
     }
 
     // Fonctionnalité "Partager"
     if (event.target.classList.contains('share-button')) {
        const image = event.target.closest('.photo-item').querySelector('.image');
        const imageSrc = image.src;
        alert(`Lien de partage généré : ${imageSrc}`);
    }

    // Fonctionnalité "Enregistrer"
    if (event.target.classList.contains('save-button')) {
        const image = event.target.closest('.photo-item').querySelector('.image');
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'image.png';
        link.click();
    }



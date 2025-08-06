document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const nameInput = document.getElementById('nameInput');
    const photoInput = document.getElementById('photoInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileName = document.getElementById('fileName');
    const messageInput = document.getElementById('messageInput');
    const submitBtn = document.getElementById('submitBtn');
    const creatorSection = document.getElementById('creatorSection');
    const resultSection = document.getElementById('resultSection');
    const generatedLink = document.getElementById('generatedLink');
    const copyBtn = document.getElementById('copyBtn');
    const previewContent = document.getElementById('previewContent');
    const newCardBtn = document.getElementById('newCardBtn');
    
    // Celebration GIFs (randomly selected)
    const celebrationGIFs = [
        'https://media.giphy.com/media/l0HU7JI1uOlMnKfQ4/giphy.gif',
        'https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif',
        'https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif',
        'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
        'https://media.giphy.com/media/26tP3M3i03hoIYL6M/giphy.gif'
    ];
    
    // Event Listeners
    uploadBtn.addEventListener('click', function() {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', function() {
        if (photoInput.files && photoInput.files.length > 0) {
            fileName.textContent = photoInput.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        generateBirthdayPage();
    });
    
    copyBtn.addEventListener('click', copyToClipboard);
    newCardBtn.addEventListener('click', resetForm);
    
    // Functions
    function generateBirthdayPage() {
        const name = nameInput.value.trim();
        const message = messageInput.value.replace(/{name}/g, name);
        
        if (!name) {
            alert('Please enter the birthday person\'s name');
            return;
        }
        
        // Create preview
        if (photoInput.files && photoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createCard(e.target.result, name, message);
            };
            reader.onerror = function() {
                alert('Error reading the image file. Please try another image.');
                createCard(null, name, message);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            createCard(null, name, message);
        }
    }
    
    function createCard(imageData, name, message) {
        const randomGIF = celebrationGIFs[Math.floor(Math.random() * celebrationGIFs.length)];
        
        // Create preview
        previewContent.innerHTML = `
            <div class="birthday-card">
                ${imageData ? `<img src="${imageData}" alt="${name}" class="birthday-image">` : '<div class="birthday-image-placeholder"><i class="fas fa-user"></i></div>'}
                <h2 class="birthday-name">Happy Birthday, ${name}!</h2>
                <img src="${randomGIF}" alt="Celebration" class="celebration-gif">
                <div class="birthday-message">${message}</div>
            </div>
        `;
        
        // Generate a unique ID for this card
        const cardId = 'card-' + Date.now();
        
        // Save card data to localStorage
        const cardData = {
            name: name,
            message: message,
            image: imageData || '',
            gif: randomGIF,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(cardId, JSON.stringify(cardData));
        
        // Generate the URL - in a real app this would point to your server
        const currentUrl = window.location.href.split('?')[0];
        const shareUrl = `${currentUrl.replace('index.html', '')}card.html?id=${cardId}`;
        
        generatedLink.value = shareUrl;
        
        // Show result section
        creatorSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }
    
    function copyToClipboard() {
        generatedLink.select();
        generatedLink.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        
        // Change button text temporarily
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }
    
    function resetForm() {
        nameInput.value = '';
        photoInput.value = '';
        fileName.textContent = 'No file chosen';
        messageInput.value = 'Happy Birthday, {name} 💕! Wishing you a day filled with joy and happiness! 🎈🎉 May God bless You..! ✨';
        
        resultSection.classList.add('hidden');
        creatorSection.classList.remove('hidden');
    }
});
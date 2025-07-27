// script.js
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const mainVideo = document.getElementById('main-video');
  const downloadButton = document.querySelector('.download-button');
  const likeButton = document.querySelector('.action-button:nth-child(1)');
  const dislikeButton = document.querySelector('.action-button:nth-child(2)');
  const shareButton = document.querySelector('.action-button:nth-child(3)');
  const subscribeButton = document.querySelector('.channel-card .action-button');
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-items a');
  
  // Video Data - In a real app, this would come from an API
  const videos = [
    {
      id: 1,
      title: "Creating Stunning UI Designs with CSS - A Complete Tutorial",
      channel: "Design Mastery",
      views: "125K",
      date: "2 days ago",
      likes: "8.2K",
      dislikes: "42",
      duration: "24:18",
      thumbnail: "https://i.ytimg.com/vi/4deVCNJq3qc/hq720.jpg",
      description: "Learn how to create stunning UI designs using modern CSS techniques. In this comprehensive tutorial, we'll cover Flexbox, Grid, animations, and responsive design principles. Perfect for beginners and experienced developers alike!",
      channelIcon: "D",
      subscribers: "245K"
    },
    {
      id: 2,
      title: "Advanced CSS Animations You Need to Know",
      channel: "Web Dev Simplified",
      views: "98K",
      date: "1 week ago",
      likes: "5.7K",
      dislikes: "31",
      duration: "12:45",
      thumbnail: "https://i.ytimg.com/vi/jV8B24rSN5o/hq720.jpg",
      description: "Take your CSS skills to the next level with these advanced animation techniques that will make your websites stand out.",
      channelIcon: "W",
      subscribers: "187K"
    },
    {
      id: 3,
      title: "Mastering CSS Grid Layout in 2023",
      channel: "CSS Masters",
      views: "152K",
      date: "3 days ago",
      likes: "9.3K",
      dislikes: "18",
      duration: "18:22",
      thumbnail: "https://i.ytimg.com/vi/srvUrASNj0s/hq720.jpg",
      description: "Everything you need to know about CSS Grid Layout to create complex, responsive web designs with ease.",
      channelIcon: "C",
      subscribers: "321K"
    },
    {
      id: 4,
      title: "Responsive Web Design Principles for Modern Websites",
      channel: "Frontend Focus",
      views: "78K",
      date: "2 weeks ago",
      likes: "4.2K",
      dislikes: "27",
      duration: "25:10",
      thumbnail: "https://i.ytimg.com/vi/1PnVor36_40/hq720.jpg",
      description: "Learn the core principles of responsive web design and how to implement them in your projects for a flawless user experience.",
      channelIcon: "F",
      subscribers: "142K"
    },
    {
      id: 5,
      title: "Building a Complete Dashboard UI with CSS",
      channel: "Design Mastery",
      views: "64K",
      date: "5 days ago",
      likes: "3.8K",
      dislikes: "15",
      duration: "15:33",
      thumbnail: "https://i.ytimg.com/vi/8c4X8b4X8c4/hq720.jpg",
      description: "Step-by-step guide to building a professional admin dashboard using modern CSS techniques and layout methods.",
      channelIcon: "D",
      subscribers: "245K"
    },
    {
      id: 6,
      title: "JavaScript Array Methods Explained",
      channel: "JS Wizard",
      views: "210K",
      date: "4 days ago",
      likes: "12.4K",
      dislikes: "63",
      duration: "22:47",
      thumbnail: "https://i.ytimg.com/vi/R8rmfD9Y5-c/hq720.jpg",
      description: "Master JavaScript array methods with practical examples and real-world use cases.",
      channelIcon: "J",
      subscribers: "412K"
    }
  ];

  // Current video state
  let currentVideo = videos[0];
  let isSubscribed = false;
  let liked = false;
  let disliked = false;

  // Initialize the page
  function initPage() {
    renderRelatedVideos();
    setupEventListeners();
    adjustVideoGrid();
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Video interaction
    if (mainVideo) {
      mainVideo.addEventListener('play', handleVideoPlay);
    }
    
    // Buttons
    if (downloadButton) {
      downloadButton.addEventListener('click', downloadVideo);
    }
    
    if (likeButton) {
      likeButton.addEventListener('click', toggleLike);
    }
    
    if (dislikeButton) {
      dislikeButton.addEventListener('click', toggleDislike);
    }
    
    if (shareButton) {
      shareButton.addEventListener('click', shareVideo);
    }
    
    if (subscribeButton) {
      subscribeButton.addEventListener('click', toggleSubscribe);
    }
    
    // Search
    if (searchInput) {
      searchInput.addEventListener('keyup', handleSearch);
    }
    
    if (searchButton) {
      searchButton.addEventListener('click', performSearch);
    }
    
    // Navigation
    sidebarItems.forEach(item => {
      item.addEventListener('click', handleSidebarClick);
    });
    
    mobileNavItems.forEach(item => {
      item.addEventListener('click', handleMobileNavClick);
    });
    
    // Window resize
    window.addEventListener('resize', adjustVideoGrid);
    
    // Video card clicks
    document.querySelectorAll('.video-card').forEach((card, index) => {
      card.addEventListener('click', () => loadVideo(videos[index]));
    });
  }

  // Handle video play to update view count
  function handleVideoPlay() {
    const viewsElement = document.querySelector('.player-info .video-meta span:first-child');
    if (viewsElement) {
      const views = parseInt(viewsElement.textContent.replace('K', '')) * 1000;
      viewsElement.textContent = formatNumber(views + 1) + ' views';
    }
  }

  // Format large numbers
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  }

  // Download video functionality
  function downloadVideo() {
    if (!mainVideo) return;
    
    const videoUrl = mainVideo.querySelector('source').src;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'inktube_video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show download confirmation
    const originalHTML = downloadButton.innerHTML;
    downloadButton.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    downloadButton.style.background = '#4CAF50';
    
    setTimeout(() => {
      downloadButton.innerHTML = originalHTML;
      downloadButton.style.background = '';
    }, 2000);
  }

  // Toggle like functionality
  function toggleLike() {
    if (disliked) {
      disliked = false;
      dislikeButton.style.background = '';
    }
    
    liked = !liked;
    
    if (liked) {
      likeButton.style.color = '#3ea6ff';
      likeButton.style.background = 'rgba(62, 166, 255, 0.2)';
      likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i> 8.3K';
    } else {
      likeButton.style.color = '';
      likeButton.style.background = '';
      likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i> 8.2K';
    }
  }

  // Toggle dislike functionality
  function toggleDislike() {
    if (liked) {
      liked = false;
      likeButton.style.background = '';
      likeButton.style.color = '';
      likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i> 8.2K';
    }
    
    disliked = !disliked;
    
    if (disliked) {
      dislikeButton.style.color = '#3ea6ff';
      dislikeButton.style.background = 'rgba(62, 166, 255, 0.2)';
    } else {
      dislikeButton.style.color = '';
      dislikeButton.style.background = '';
    }
  }

  // Share video functionality
  function shareVideo() {
    if (navigator.share) {
      navigator.share({
        title: currentVideo.title,
        text: 'Check out this video on InkTube',
        url: window.location.href
      })
      .then(() => console.log('Shared successfully'))
      .catch(error => console.log('Sharing failed', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          const originalHTML = shareButton.innerHTML;
          shareButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
          
          setTimeout(() => {
            shareButton.innerHTML = originalHTML;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          alert('Share link copied to clipboard: ' + shareUrl);
        });
    }
  }

  // Toggle subscribe functionality
  function toggleSubscribe() {
    isSubscribed = !isSubscribed;
    
    if (isSubscribed) {
      subscribeButton.innerHTML = '<i class="fas fa-check"></i> Subscribed';
      subscribeButton.style.background = 'rgba(255, 255, 255, 0.1)';
    } else {
      subscribeButton.innerHTML = 'Subscribe';
      subscribeButton.style.background = '';
    }
  }

  // Handle search input
  function handleSearch(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  }

  // Perform search
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      // Filter videos based on search term
      const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        video.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Render search results
      renderSearchResults(filteredVideos);
      
      // Update the URL
      window.history.pushState({}, '', `?search=${encodeURIComponent(searchTerm)}`);
    }
  }

  // Handle sidebar navigation
  function handleSidebarClick(e) {
    // Remove active class from all items
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    e.currentTarget.classList.add('active');
    
    // Get the category
    const category = e.currentTarget.textContent.trim();
    
    // Filter videos by category
    if (category === 'Trending') {
      // Sort by views (descending)
      const trendingVideos = [...videos].sort((a, b) => 
        parseInt(b.views) - parseInt(a.views)
      );
      renderVideoGrid(trendingVideos);
    } else if (category === 'Home') {
      renderVideoGrid(videos);
    } else {
      // For other categories, filter by category name
      const categoryVideos = videos.filter(video => 
        video.title.toLowerCase().includes(category.toLowerCase())
      );
      renderVideoGrid(categoryVideos);
    }
  }

  // Handle mobile navigation
  function handleMobileNavClick(e) {
    // Remove active class from all items
    mobileNavItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    e.currentTarget.classList.add('active');
    
    // For simplicity, just show home videos
    renderVideoGrid(videos);
  }

  // Render related videos
  function renderRelatedVideos() {
    const relatedContainer = document.querySelector('.related-videos .video-grid');
    if (!relatedContainer) return;
    
    // Clear existing content
    relatedContainer.innerHTML = '';
    
    // Get related videos (excluding current video)
    const relatedVideos = videos.filter(video => video.id !== currentVideo.id);
    
    // Render each video
    relatedVideos.forEach(video => {
      const videoCard = createVideoCard(video);
      relatedContainer.appendChild(videoCard);
      
      // Add click event to load video
      videoCard.addEventListener('click', () => loadVideo(video));
    });
  }

  // Render video grid
  function renderVideoGrid(videosToRender) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Create new grid container
    const videoGrid = document.createElement('div');
    videoGrid.className = 'video-grid';
    
    // Render each video
    videosToRender.forEach(video => {
      const videoCard = createVideoCard(video);
      videoGrid.appendChild(videoCard);
      
      // Add click event to load video
      videoCard.addEventListener('click', () => loadVideo(video));
    });
    
    // Replace existing content with new grid
    const playerSection = document.querySelector('.video-player-container');
    if (playerSection) {
      playerSection.remove();
    }
    
    const relatedSection = document.querySelector('.related-videos');
    if (relatedSection) {
      relatedSection.remove();
    }
    
    mainContent.innerHTML = '';
    mainContent.appendChild(videoGrid);
  }

  // Render search results
  function renderSearchResults(results) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Clear existing content
    mainContent.innerHTML = '';
    
    if (results.length === 0) {
      mainContent.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search fa-3x"></i>
          <h2>No videos found</h2>
          <p>Try different keywords or browse our categories</p>
        </div>
      `;
      return;
    }
    
    // Create search results header
    const resultsHeader = document.createElement('h2');
    resultsHeader.className = 'section-title';
    resultsHeader.textContent = `Search Results: ${results.length} videos found`;
    mainContent.appendChild(resultsHeader);
    
    // Create video grid
    const videoGrid = document.createElement('div');
    videoGrid.className = 'video-grid';
    
    // Render each result
    results.forEach(video => {
      const videoCard = createVideoCard(video);
      videoGrid.appendChild(videoCard);
      
      // Add click event to load video
      videoCard.addEventListener('click', () => loadVideo(video));
    });
    
    mainContent.appendChild(videoGrid);
  }

  // Create a video card element
  function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    card.innerHTML = `
      <div class="thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="video-duration">${video.duration}</div>
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <div class="channel-info">
          <div class="channel-icon">${video.channelIcon}</div>
          <div class="video-details">
            <div class="channel-name">${video.channel}</div>
            <div class="video-meta">${video.views} views • ${video.date}</div>
          </div>
        </div>
      </div>
    `;
    
    return card;
  }

  // Load a video into the player
  function loadVideo(video) {
    currentVideo = video;
    
    // Update URL
    window.history.pushState({}, '', `?v=${video.id}`);
    
    // Update main content
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
      <div class="video-player-container">
        <div class="video-player">
          <video controls id="main-video">
            <source src="assets/sample.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div class="player-info">
          <div class="video-details">
            <h2 class="video-title">${video.title}</h2>
            <div class="video-meta">
              <span>${video.views} views</span>
              <span>•</span>
              <span>${video.date}</span>
            </div>
          </div>
          
          <div class="video-actions">
            <button class="action-button">
              <i class="fas fa-thumbs-up"></i> ${video.likes}
            </button>
            <button class="action-button">
              <i class="fas fa-thumbs-down"></i> ${video.dislikes}
            </button>
            <button class="action-button">
              <i class="fas fa-share"></i> Share
            </button>
            <button class="action-button download-button">
              <i class="fas fa-download"></i> Download
            </button>
          </div>
        </div>
        
        <div class="channel-card">
          <div class="channel-info">
            <div class="channel-icon">${video.channelIcon}</div>
            <div>
              <div class="channel-name">${video.channel}</div>
              <div class="subscribers">${video.subscribers} subscribers</div>
            </div>
            <button class="action-button">${isSubscribed ? '<i class="fas fa-check"></i> Subscribed' : 'Subscribe'}</button>
          </div>
          <p class="video-description">
            ${video.description}
          </p>
        </div>
      </div>
      
      <div class="related-videos">
        <h3 class="section-title">Related Videos</h3>
        <div class="video-grid"></div>
      </div>
    `;
    
    // Reinitialize event listeners
    setupEventListeners();
    
    // Render related videos
    renderRelatedVideos();
  }

  // Adjust video grid based on screen size
  function adjustVideoGrid() {
    const videoGrid = document.querySelector('.video-grid');
    if (!videoGrid) return;
    
    const width = window.innerWidth;
    
    if (width < 768) {
      videoGrid.style.gridTemplateColumns = '1fr';
    } else if (width < 1200) {
      videoGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    } else {
      videoGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    }
  }

  // Initialize the page
  initPage();
});

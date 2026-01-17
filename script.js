// Tab functionality and interactive enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab + 'Content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Add loading state for PDF
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfFallback = document.getElementById('pdfFallback');
    const pdfLoader = document.getElementById('pdfLoader');
    
    if (pdfViewer) {
        // Hide loader and show PDF when loaded
        pdfViewer.addEventListener('load', function() {
            console.log('PDF loaded successfully');
            if (pdfLoader) {
                pdfLoader.style.display = 'none';
            }
            pdfViewer.classList.add('loaded');
        });
        
        // Show fallback if PDF fails to load
        pdfViewer.addEventListener('error', function() {
            console.log('PDF failed to load, showing fallback');
            if (pdfLoader) {
                pdfLoader.style.display = 'none';
            }
            if (pdfFallback) {
                pdfFallback.style.display = 'block';
            }
        });
        
        // Fallback timeout - if PDF doesn't load within 10 seconds, show fallback
        setTimeout(function() {
            if (pdfLoader && pdfLoader.style.display !== 'none') {
                pdfLoader.style.display = 'none';
                if (pdfFallback) {
                    pdfFallback.style.display = 'block';
                }
            }
        }, 10000);
    }
    
    // Add touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Mobile orientation and resize handling for PDF viewer
    function adjustPDFViewerForMobile() {
        const pdfViewer = document.getElementById('pdfViewer');
        
        if (pdfViewer && window.innerWidth <= 768) {
            // Use smaller fixed heights for mobile
            if (window.innerWidth <= 480) {
                // Small mobile devices
                pdfViewer.style.height = '350px';
                pdfViewer.style.maxHeight = '400px';
            } else if (window.innerWidth <= 360) {
                // Very small mobile devices
                pdfViewer.style.height = '300px';
                pdfViewer.style.maxHeight = '350px';
            } else {
                // Tablets
                pdfViewer.style.height = '450px';
                pdfViewer.style.maxHeight = '500px';
            }
        }
    }
    
    // Adjust on load and resize
    if (window.innerWidth <= 768) {
        adjustPDFViewerForMobile();
        window.addEventListener('resize', adjustPDFViewerForMobile);
        window.addEventListener('orientationchange', function() {
            setTimeout(adjustPDFViewerForMobile, 100);
        });
    }
    
    // Handle image loading
    const posterImage = document.querySelector('.poster-image');
    if (posterImage) {
        posterImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        posterImage.addEventListener('error', function() {
            console.error('Poster image failed to load');
            this.style.display = 'none';
        });
    }
});

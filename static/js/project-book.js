// Interactive script for Rust Book (mdBook) style project reader

function initProjectBook() {
    const layout = document.querySelector('.project-book-layout');
    if (!layout) return;

    const sidebarToggleBtn = document.getElementById('project-sidebar-toggle');
    const backdrop = document.querySelector('.project-sidebar-backdrop');
    const prevLink = document.querySelector('.project-nav-card.prev');
    const nextLink = document.querySelector('.project-nav-card.next');

    // Restore desktop sidebar state from localStorage
    if (window.innerWidth >= 900) {
        const savedState = localStorage.getItem('project-sidebar-collapsed');
        if (savedState === 'true') {
            layout.classList.add('sidebar-hidden');
            if (sidebarToggleBtn) {
                sidebarToggleBtn.setAttribute('aria-expanded', 'false');
            }
        } else {
            if (sidebarToggleBtn) {
                sidebarToggleBtn.setAttribute('aria-expanded', 'true');
            }
        }
    }

    // Toggle sidebar
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.innerWidth < 900) {
                // Mobile drawer
                layout.classList.toggle('sidebar-mobile-open');
            } else {
                // Desktop collapse
                layout.classList.toggle('sidebar-hidden');
                const isHidden = layout.classList.contains('sidebar-hidden');
                localStorage.setItem('project-sidebar-collapsed', isHidden ? 'true' : 'false');
                sidebarToggleBtn.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
            }
        });
    }

    // Close mobile drawer on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', function() {
            layout.classList.remove('sidebar-mobile-open');
        });
    }

    // Chapter directory accordion toggle
    document.querySelectorAll('.chapter-dir-header').forEach(header => {
        header.addEventListener('click', function() {
            const dir = this.closest('.chapter-dir');
            if (dir) {
                dir.classList.toggle('collapsed');
            }
        });
    });

    // Keyboard navigation (ArrowLeft = prev chapter, ArrowRight = next chapter)
    document.addEventListener('keydown', function(e) {
        const activeElem = document.activeElement;
        const isInput = activeElem && (
            activeElem.tagName === 'INPUT' ||
            activeElem.tagName === 'TEXTAREA' ||
            activeElem.isContentEditable
        );
        if (isInput) return;

        if (e.key === 'ArrowLeft' && prevLink) {
            window.location.href = prevLink.getAttribute('href');
        } else if (e.key === 'ArrowRight' && nextLink) {
            window.location.href = nextLink.getAttribute('href');
        }
    });

    // Scroll active item into view in sidebar if needed
    const activeItem = document.querySelector('.project-sidebar li.chapter-item.active');
    if (activeItem) {
        const sidebar = document.querySelector('.project-sidebar');
        if (sidebar) {
            const rect = activeItem.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            if (rect.top < sidebarRect.top || rect.bottom > sidebarRect.bottom) {
                activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectBook);
} else {
    initProjectBook();
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Initialize AOS after preloader
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
            });
        }, 500);
    });

    // 2. Sticky Navbar & Scroll To Top Button
    const navbar = document.getElementById('mainNav');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');

    // Check localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            darkIcon.classList.add('d-none');
            lightIcon.classList.remove('d-none');
        } else {
            lightIcon.classList.add('d-none');
            darkIcon.classList.remove('d-none');
        }
    }

    // 4. Set Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 5. Generate Products dynamically
    const carOilsData = [
        { brand: 'zic', name: 'ZIC X9', grade: '5W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=ZIC+X9' },
        { brand: 'kor', name: 'KOR Premium', grade: '10W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=KOR+Premium' },
        { brand: 'idemitsu', name: 'Idemitsu Eco', grade: '0W-20', image: 'https://placehold.co/400x400/eeeeee/000000?text=Idemitsu' },
        { brand: 'toyota', name: 'Toyota Genuine', grade: '5W-30', image: 'https://placehold.co/400x400/eeeeee/000000?text=Toyota+Genuine' },
        { brand: 'honda', name: 'Honda Genuine', grade: '0W-20', image: 'https://placehold.co/400x400/eeeeee/000000?text=Honda+Genuine' },
        { brand: 'castrol', name: 'Castrol Edge', grade: '5W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=Castrol+Edge' },
        { brand: 'mobil', name: 'Mobil 1', grade: '0W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=Mobil+1' },
        { brand: 'liqui-moly', name: 'Liqui Moly Molygen', grade: '5W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=Liqui+Moly' },
        { brand: 'total', name: 'Total Quartz', grade: '5W-30', image: 'https://placehold.co/400x400/eeeeee/000000?text=Total+Quartz' },
        { brand: 'shell', name: 'Shell Helix Ultra', grade: '5W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=Shell+Helix' },
    ];

    const bikeOilsData = [
        { brand: 'zic', name: 'ZIC M9', grade: '10W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=ZIC+M9' },
        { brand: 'honda', name: 'Honda Genuine 4T', grade: '10W-30', image: 'https://placehold.co/400x400/eeeeee/000000?text=Honda+4T' },
        { brand: 'castrol', name: 'Castrol Power1', grade: '10W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=Castrol+Power1' },
        { brand: 'liqui-moly', name: 'Liqui Moly Motorbike', grade: '10W-40', image: 'https://placehold.co/400x400/eeeeee/000000?text=Liqui+Moly+Bike' },
        { brand: 'shell', name: 'Shell Advance', grade: '20W-50', image: 'https://placehold.co/400x400/eeeeee/000000?text=Shell+Advance' },
    ];

    const carCareData = [
        { name: 'Premium Dashboard Polish', image: 'https://placehold.co/400x400/eeeeee/000000?text=Dashboard+Polish' },
        { name: 'Exterior Wax Polish', image: 'https://placehold.co/400x400/eeeeee/000000?text=Wax+Polish' },
        { name: 'Microfiber Cleaning Cloth', image: 'https://placehold.co/400x400/eeeeee/000000?text=Microfiber' },
        { name: 'Tire Shine Spray', image: 'https://placehold.co/400x400/eeeeee/000000?text=Tire+Shine' },
    ];

    function createProductCard(product, type = 'car') {
        const brandBadge = product.brand ? `<span class="badge bg-secondary mb-2 text-capitalize">${product.brand.replace('-', ' ')}</span>` : '';
        const gradeText = product.grade ? `<p class="mb-2"><strong>Grade:</strong> ${product.grade}</p>` : '';
        const filterClass = product.brand ? `product-item ${product.brand}` : 'product-item';
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 ${filterClass}" data-brand="${product.brand || 'all'}">
                <div class="product-card glass-card">
                    <div class="product-img p-2">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid rounded" style="object-fit: cover; height: 100%; width: 100%;">
                    </div>
                    <div class="product-info">
                        ${brandBadge}
                        <h4>${product.name}</h4>
                        ${gradeText}
                        <div class="product-actions mt-3">
                            <button class="btn btn-sm btn-outline-primary w-50">Details</button>
                            <button class="btn btn-sm btn-primary w-50"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Populate Grids
    const carOilsGrid = document.querySelector('.product-grid');
    const bikeOilsGrid = document.querySelector('.product-grid-bike');
    const carCareGrid = document.getElementById('carCareGrid');

    if(carOilsGrid) carOilsGrid.innerHTML = carOilsData.map(p => createProductCard(p)).join('');
    if(bikeOilsGrid) bikeOilsGrid.innerHTML = bikeOilsData.map(p => createProductCard(p, 'bike')).join('');
    if(carCareGrid) carCareGrid.innerHTML = carCareData.map(p => createProductCard(p, 'care')).join('');

    // 6. Brand Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');
            
            // Filter both Car and Bike grids
            const allItems = document.querySelectorAll('.product-item');
            
            allItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-brand') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // Refresh AOS on filter (optional, just trigger a resize to reposition elements)
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 300);
        });
    });

});

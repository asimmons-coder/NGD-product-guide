import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Product data - easy to update
const products = [
  {
    id: 'cerave-moisturizing-cream',
    name: 'CeraVe Moisturizing Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dry Skin', 'Eczema', 'Sensitive Skin'],
    trending: false,
    overview: 'A dermatologist-developed moisturizer containing ceramides, hyaluronic acid, and MVE technology for sustained hydration. Fragrance-free and non-comedogenic.',
    verdict: 'An excellent, affordable choice for daily moisturizing. The ceramide complex helps restore the skin barrier, making it particularly useful for patients with compromised skin barriers or eczema-prone skin.',
    lastReviewed: '2025-01-15'
  },
  {
    id: 'tretinoin',
    name: 'Tretinoin (Prescription)',
    category: 'Retinoid',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Anti-Aging', 'Acne', 'Hyperpigmentation', 'Sun Damage'],
    trending: false,
    overview: 'Prescription-strength vitamin A derivative with decades of research supporting its efficacy for both acne treatment and photoaging.',
    verdict: 'The gold standard for anti-aging and acne. Decades of research support its ability to increase collagen production, speed cell turnover, and improve skin texture. Start low and slow to minimize irritation.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'pdrn-salmon-dna',
    name: 'PDRN / Salmon DNA Serums',
    category: 'Serum',
    rating: 'insufficient',
    ratingLabel: 'Insufficient Evidence',
    evidence: 'Limited',
    concerns: ['Anti-Aging', 'Hydration'],
    trending: true,
    overview: 'Polydeoxyribonucleotide (PDRN) derived from salmon sperm/DNA, trending heavily on social media as the "next big thing" in K-beauty anti-aging.',
    verdict: 'The hype outpaces the science. Injectable PDRN shows moderate evidence for wound healing in clinical settings, but it\'s not FDA-approved in the US. Topical versions have very limited penetration—you\'re likely just getting an expensive hydrator. Save your money for proven ingredients.',
    lastReviewed: '2025-01-28'
  },
  {
    id: 'la-roche-posay-anthelios',
    name: 'La Roche-Posay Anthelios',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Anti-Aging', 'Sensitive Skin'],
    trending: false,
    overview: 'European sunscreen formulation with superior UVA protection using Mexoryl filters. Lightweight, minimal white cast.',
    verdict: 'One of the best sunscreens available. The European formulation offers broader UVA protection than most US options. The texture is elegant enough that patients actually use it daily—which is the most important factor in sun protection.',
    lastReviewed: '2025-01-10'
  },
  {
    id: 'beef-tallow',
    name: 'Beef Tallow Skincare',
    category: 'Moisturizer',
    rating: 'not-recommended',
    ratingLabel: 'Not Recommended',
    evidence: 'None',
    concerns: ['Dry Skin', 'Eczema'],
    trending: true,
    overview: 'Rendered beef fat marketed as a "natural" alternative to conventional moisturizers, popularized by social media claims about ancestral skincare.',
    verdict: 'Skip it. There\'s no clinical evidence supporting beef tallow over proven moisturizers. It\'s comedogenic for many skin types, can cause contact dermatitis, and lacks the ceramides and humectants that actually repair the skin barrier. Marketing nostalgia isn\'t science.',
    lastReviewed: '2025-01-25'
  },
  {
    id: 'paulas-choice-bha',
    name: 'Paula\'s Choice 2% BHA Liquid Exfoliant',
    category: 'Exfoliant',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Blackheads', 'Enlarged Pores', 'Texture'],
    trending: false,
    overview: 'A leave-on salicylic acid exfoliant at the optimal 2% concentration and pH for effectiveness. Fragrance-free formula.',
    verdict: 'A well-formulated BHA that does exactly what it claims. Salicylic acid is oil-soluble, so it penetrates pores to reduce congestion and blackheads. Use 2-3x weekly to start. Excellent for oily and acne-prone skin types.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'at-home-microneedling',
    name: 'At-Home Microneedling Devices',
    category: 'Device',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Moderate',
    concerns: ['Anti-Aging', 'Scarring', 'Texture'],
    trending: true,
    overview: 'Consumer microneedling devices (dermarollers, pens) with needle depths typically 0.25-0.5mm, marketed for collagen stimulation and product absorption.',
    verdict: 'Proceed carefully. At-home devices can\'t reach the depths needed for true collagen remodeling (1.5-2mm). They may improve product absorption and cause minor improvements, but also carry infection and scarring risks if not properly sterilized. For real results, professional microneedling is worth the investment.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'skinceuticals-ce-ferulic',
    name: 'SkinCeuticals C E Ferulic',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Hyperpigmentation', 'Sun Damage', 'Brightening'],
    trending: false,
    overview: 'The original patented vitamin C serum combining 15% L-ascorbic acid with vitamin E and ferulic acid for enhanced stability and efficacy.',
    verdict: 'The benchmark vitamin C serum. The Duke Antioxidant Patent formulation has solid research behind it. Yes, it\'s expensive, but the formulation is genuinely superior to most alternatives. Apply in the morning under sunscreen for antioxidant protection.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'the-ordinary-niacinamide',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Oily Skin', 'Enlarged Pores', 'Acne', 'Redness'],
    trending: false,
    overview: 'A high-concentration niacinamide (vitamin B3) serum with zinc for sebum regulation. Budget-friendly option from a science-focused brand.',
    verdict: 'Great value for a well-researched ingredient. Niacinamide at 5%+ has good evidence for reducing sebum production, improving barrier function, and evening skin tone. Some patients find 10% irritating—if so, use less frequently or buffer with moisturizer.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'drunk-elephant-protini',
    name: 'Drunk Elephant Protini Polypeptide Cream',
    category: 'Moisturizer',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Moderate',
    concerns: ['Anti-Aging', 'Hydration'],
    trending: false,
    overview: 'A protein-focused moisturizer featuring signal peptides, growth factors, and amino acids in a lightweight gel-cream texture.',
    verdict: 'A good moisturizer at a premium price. Peptides have promising but limited evidence for anti-aging benefits. The formulation is clean and well-tolerated, but you\'re paying mostly for marketing. Similar results can be achieved with more affordable options plus proven actives like retinoids.',
    lastReviewed: '2025-01-08'
  },
  {
    id: 'aquaphor',
    name: 'Aquaphor Healing Ointment',
    category: 'Moisturizer',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Dry Skin', 'Wound Healing', 'Eczema', 'Chapped Lips'],
    trending: false,
    overview: 'A petrolatum-based occlusive ointment with lanolin and panthenol. A dermatology staple for decades.',
    verdict: 'A workhorse product that belongs in every medicine cabinet. Petrolatum is the most effective occlusive we have—it reduces transepidermal water loss by over 98%. Use for extremely dry skin, post-procedure care, or as a "slug" over other products. Ignore the "it clogs pores" myth; it\'s non-comedogenic.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'glow-recipe-watermelon',
    name: 'Glow Recipe Watermelon Glow Niacinamide Dew Drops',
    category: 'Serum',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Hydration', 'Brightening'],
    trending: false,
    overview: 'A highlighting serum with niacinamide, watermelon extract, and light-reflecting particles for a "dewy" finish.',
    verdict: 'More makeup than skincare. While it contains niacinamide, the concentration isn\'t disclosed. The "glow" comes primarily from light-reflecting particles, not skin improvement. Fine as a cosmetic product, but don\'t expect skincare benefits. The fragrance may irritate sensitive skin.',
    lastReviewed: '2025-01-05'
  },
  {
    id: 'differin-gel',
    name: 'Differin Gel (Adapalene 0.1%)',
    category: 'Retinoid',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Anti-Aging', 'Blackheads'],
    trending: false,
    overview: 'The first prescription-strength retinoid available over-the-counter. A third-generation retinoid that\'s more stable and less irritating than tretinoin.',
    verdict: 'Excellent entry point for retinoid therapy. Adapalene is FDA-approved for acne and has evidence for anti-aging benefits, though slightly less potent than tretinoin. Better tolerated by most patients, making it easier to maintain consistent use. Can transition to prescription-strength tretinoin once adapted.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'elta-md-uv-clear',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    category: 'Sunscreen',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Sun Protection', 'Acne', 'Sensitive Skin', 'Rosacea'],
    trending: false,
    overview: 'A lightweight, oil-free mineral-chemical hybrid sunscreen with niacinamide. Specifically formulated for acne-prone and sensitive skin.',
    verdict: 'My top recommendation for patients with acne or rosacea who need daily sun protection. The niacinamide calms inflammation, the zinc oxide provides physical protection, and the formula doesn\'t trigger breakouts. Elegant enough for daily use under makeup.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'snail-mucin',
    name: 'Snail Mucin Products (COSRX, etc.)',
    category: 'Serum',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Hydration', 'Anti-Aging', 'Wound Healing'],
    trending: true,
    overview: 'Secretion filtrate from snails, popularized by K-beauty for claimed wound healing and anti-aging properties.',
    verdict: 'The evidence is thin but it\'s probably harmless. A few small studies suggest wound healing benefits, but the mechanism and optimal concentration are unclear. It\'s a decent hydrator. If you enjoy the texture and it works for you, fine—but don\'t expect miracles. Those with shellfish allergies should avoid.',
    lastReviewed: '2025-01-24'
  }
];

// Category metadata for landing page cards
const categoryMeta = {
  'Sunscreen': {
    icon: '☀️',
    slug: 'sunscreens',
    description: 'Protection from UV damage',
    color: '#f59e0b'
  },
  'Moisturizer': {
    icon: '💧',
    slug: 'moisturizers',
    description: 'Hydration & skin barrier',
    color: '#3b82f6'
  },
  'Serum': {
    icon: '✨',
    slug: 'serums',
    description: 'Targeted treatments',
    color: '#8b5cf6'
  },
  'Retinoid': {
    icon: '💊',
    slug: 'retinoids',
    description: 'Anti-aging & acne',
    color: '#ec4899'
  },
  'Exfoliant': {
    icon: '🧴',
    slug: 'exfoliants',
    description: 'Cell turnover & texture',
    color: '#10b981'
  },
  'Device': {
    icon: '🔬',
    slug: 'devices',
    description: 'Tools & technology',
    color: '#6366f1'
  }
};

// Map slugs back to category names
const slugToCategory = Object.entries(categoryMeta).reduce((acc, [cat, meta]) => {
  acc[meta.slug] = cat;
  return acc;
}, {});

const ratings = [
  { value: 'all', label: 'All Ratings' },
  { value: 'gold', label: 'Gold Standard' },
  { value: 'recommended', label: 'Recommended' },
  { value: 'caution', label: 'Use With Caution' },
  { value: 'insufficient', label: 'Insufficient Evidence' },
  { value: 'not-recommended', label: 'Not Recommended' }
];

const ratingConfig = {
  'gold': { color: '#92722a', bg: '#fef9e7', label: 'Gold Standard', icon: '★' },
  'recommended': { color: '#2d6a4f', bg: '#e9f5ec', label: 'Recommended', icon: '✓' },
  'caution': { color: '#b45309', bg: '#fef3e2', label: 'Use With Caution', icon: '!' },
  'insufficient': { color: '#6b7280', bg: '#f3f4f6', label: 'Insufficient Evidence', icon: '?' },
  'not-recommended': { color: '#b91c1c', bg: '#fde8e8', label: 'Not Recommended', icon: '✗' }
};

function App() {
  // View state: 'landing' (home), 'category' (filtered by category), or product detail
  const [currentView, setCurrentView] = useState('landing');
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Handle URL hash for direct links (products and categories)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setCurrentView('landing');
        setActiveCategory(null);
        setExpandedProduct(null);
        return;
      }

      // Check if it's a category slug
      if (slugToCategory[hash]) {
        setCurrentView('category');
        setActiveCategory(slugToCategory[hash]);
        setExpandedProduct(null);
        return;
      }

      // Otherwise treat as product ID
      const product = products.find(p => p.id === hash);
      if (product) {
        setCurrentView('category');
        setActiveCategory(product.category);
        setExpandedProduct(hash);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, category = null, productId = null) => {
    setCurrentView(view);
    setActiveCategory(category);
    setExpandedProduct(productId);

    if (view === 'landing') {
      window.history.pushState(null, '', window.location.pathname);
    } else if (view === 'category' && category && categoryMeta[category]) {
      window.history.pushState(null, '', `#${categoryMeta[category].slug}`);
    } else if (productId) {
      window.history.pushState(null, '', `#${productId}`);
    }
  };

  const updateHash = (productId) => {
    if (productId) {
      window.history.pushState(null, '', `#${productId}`);
    } else if (activeCategory && categoryMeta[activeCategory]) {
      window.history.pushState(null, '', `#${categoryMeta[activeCategory].slug}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Get products for current category view
  const categoryProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Get product counts per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Get trending counts per category
  const categoryTrendingCounts = useMemo(() => {
    const counts = {};
    products.filter(p => p.trending).forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = search === '' ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.concerns.some(c => c.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchesRating = ratingFilter === 'all' || product.rating === ratingFilter;
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [search, categoryFilter, ratingFilter]);

  const handleProductClick = (productId) => {
    const newExpanded = expandedProduct === productId ? null : productId;
    setExpandedProduct(newExpanded);
    if (newExpanded) {
      window.history.pushState(null, '', `#${productId}`);
    } else {
      updateHash(null);
    }
  };

  const handleCategoryClick = (category) => {
    navigateTo('category', category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    navigateTo('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyProductLink = (e, productId) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${productId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setShowRequestForm(false);
      setRequestSubmitted(false);
    }, 2000);
  };

  const lastUpdated = new Date(Math.max(...products.map(p => new Date(p.lastReviewed)))).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Render product card (reusable)
  const renderProductCard = (product) => {
    const config = ratingConfig[product.rating];
    const isExpanded = expandedProduct === product.id;
    return (
      <article
        key={product.id}
        id={product.id}
        className={`product-card ${isExpanded ? 'expanded' : ''}`}
        onClick={() => handleProductClick(product.id)}
      >
        <div className="product-header">
          <div className="product-rating-badge" style={{ background: config.bg, color: config.color }}>
            <span className="badge-icon">{config.icon}</span>
            <span className="badge-label">{config.label}</span>
          </div>
          {product.trending && <span className="trending-tag">Trending</span>}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="meta-divider">•</span>
          <span className="product-evidence">Evidence: {product.evidence}</span>
        </div>
        <div className="product-concerns">
          {product.concerns.map(concern => (
            <span key={concern} className="concern-tag">{concern}</span>
          ))}
        </div>

        {isExpanded && (
          <div className="product-details">
            <div className="detail-section">
              <h4>Overview</h4>
              <p>{product.overview}</p>
            </div>
            <div className="detail-section verdict">
              <h4>Our Verdict</h4>
              <p>{product.verdict}</p>
            </div>
            <div className="product-footer">
              <span className="reviewed-date">Last reviewed {new Date(product.lastReviewed).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <button className="share-btn" onClick={(e) => copyProductLink(e, product.id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Copy Link
              </button>
            </div>
          </div>
        )}

        <div className="expand-indicator">
          {isExpanded ? 'Click to collapse' : 'Click for details'}
        </div>
      </article>
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo" onClick={handleBackToLanding} style={{ cursor: 'pointer' }}>Novice Group</h1>
            <span className="logo-subtitle">Dermatology</span>
          </div>
          <div className="header-meta">
            <span className="last-updated">Updated {lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* LANDING PAGE VIEW */}
      {currentView === 'landing' && (
        <>
          {/* Hero */}
          <section className="hero">
            <div className="hero-content">
              <h2 className="hero-title">Product Guide</h2>
              <p className="hero-subtitle">
                Evidence-based opinions on skincare products from our dermatology team.
                Cut through the noise—know what actually works.
              </p>
            </div>
          </section>

          {/* Search Bar (Secondary) */}
          <section className="landing-search">
            <div className="search-box search-box-small">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search products or concerns..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) {
                    setCategoryFilter('All');
                    setRatingFilter('all');
                    navigateTo('category', null);
                  }
                }}
                className="search-input"
              />
            </div>
          </section>

          {/* Category Cards Grid */}
          <section className="category-cards-section">
            <div className="category-cards-grid">
              {Object.entries(categoryMeta).map(([category, meta]) => {
                const count = categoryCounts[category] || 0;
                const trendingCount = categoryTrendingCounts[category] || 0;
                return (
                  <button
                    key={category}
                    className="category-card"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span className="category-card-icon">{meta.icon}</span>
                    <h3 className="category-card-title">{meta.slug.charAt(0).toUpperCase() + meta.slug.slice(1)}</h3>
                    <p className="category-card-description">{meta.description}</p>
                    <div className="category-card-meta">
                      <span className="category-card-count">{count} product{count !== 1 ? 's' : ''}</span>
                      {trendingCount > 0 && (
                        <span className="category-card-trending">{trendingCount} trending</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Request CTA */}
          <section className="request-section">
            <div className="request-prompt">
              <h3>Don't see a product?</h3>
              <p>Ask us to review something you're curious about.</p>
              <button className="request-btn" onClick={() => setShowRequestForm(true)}>
                Request a Review
              </button>
            </div>
          </section>
        </>
      )}

      {/* CATEGORY PAGE VIEW */}
      {currentView === 'category' && (
        <>
          {/* Back Link */}
          <section className="category-header-section">
            <button className="back-link" onClick={handleBackToLanding}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Categories
            </button>

            {activeCategory && categoryMeta[activeCategory] ? (
              <div className="category-page-header">
                <span className="category-page-icon">{categoryMeta[activeCategory].icon}</span>
                <div>
                  <h2 className="category-page-title">
                    {categoryMeta[activeCategory].slug.charAt(0).toUpperCase() + categoryMeta[activeCategory].slug.slice(1)}
                  </h2>
                  <p className="category-page-count">
                    {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} reviewed
                  </p>
                </div>
              </div>
            ) : (
              <div className="category-page-header">
                <div>
                  <h2 className="category-page-title">Search Results</h2>
                  <p className="category-page-count">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
            )}

            {/* Search within category */}
            <div className="category-filters">
              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder={activeCategory ? `Search ${categoryMeta[activeCategory]?.slug || 'products'}...` : "Search products..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="filter-row">
                <div className="filter-group">
                  <label>Rating</label>
                  <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                    {ratings.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Rating Legend */}
          <section className="legend-section">
            <div className="legend">
              {Object.entries(ratingConfig).map(([key, config]) => (
                <div key={key} className="legend-item">
                  <span className="legend-badge" style={{ background: config.bg, color: config.color }}>
                    {config.icon}
                  </span>
                  <span className="legend-label">{config.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Products List */}
          <section className="products-section">
            <div className="products-grid">
              {(activeCategory ? categoryProducts : filteredProducts)
                .filter(product => {
                  const matchesSearch = search === '' ||
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.concerns.some(c => c.toLowerCase().includes(search.toLowerCase()));
                  const matchesRating = ratingFilter === 'all' || product.rating === ratingFilter;
                  return matchesSearch && matchesRating;
                })
                .map(product => renderProductCard(product))}
            </div>

            {(activeCategory ? categoryProducts : filteredProducts).filter(product => {
              const matchesSearch = search === '' ||
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.concerns.some(c => c.toLowerCase().includes(search.toLowerCase()));
              const matchesRating = ratingFilter === 'all' || product.rating === ratingFilter;
              return matchesSearch && matchesRating;
            }).length === 0 && (
              <div className="no-results">
                <p>No products match your search.</p>
                <button onClick={() => { setSearch(''); setRatingFilter('all'); }}>
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* Request CTA */}
          <section className="request-section">
            <div className="request-prompt">
              <h3>Don't see a product?</h3>
              <p>Ask us to review something you're curious about.</p>
              <button className="request-btn" onClick={() => setShowRequestForm(true)}>
                Request a Review
              </button>
            </div>
          </section>
        </>
      )}

      {/* Request Modal */}
      {showRequestForm && (
        <div className="modal-overlay" onClick={() => setShowRequestForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRequestForm(false)}>×</button>
            {requestSubmitted ? (
              <div className="request-success">
                <span className="success-icon">✓</span>
                <h3>Thank you!</h3>
                <p>We'll review this product and add it to our guide.</p>
              </div>
            ) : (
              <>
                <h3>Request a Product Review</h3>
                <p>Tell us what product you'd like our opinion on.</p>
                <form onSubmit={handleRequestSubmit}>
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input type="text" required placeholder="e.g., Brand Name + Product Name" />
                  </div>
                  <div className="form-group">
                    <label>What's your skin concern?</label>
                    <input type="text" placeholder="e.g., acne, anti-aging, dryness" />
                  </div>
                  <div className="form-group">
                    <label>Where did you hear about it?</label>
                    <input type="text" placeholder="e.g., TikTok, friend, dermatologist" />
                  </div>
                  <div className="form-group">
                    <label>Your Email (optional)</label>
                    <input type="email" placeholder="To notify you when we review it" />
                  </div>
                  <button type="submit" className="submit-btn">Submit Request</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">Novice Group Dermatology</span>
            <p>Evidence-based skincare guidance from board-certified dermatologists.</p>
          </div>
          <div className="footer-disclaimer">
            <p><strong>Disclaimer:</strong> This guide is for educational purposes only and does not constitute medical advice. Individual results may vary. Please consult with your dermatologist before starting any new skincare regimen.</p>
          </div>
          <div className="footer-contact">
            <p>Questions? <a href="https://novicegroupderm.com" target="_blank" rel="noopener noreferrer">Visit our website</a> or call to schedule an appointment.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

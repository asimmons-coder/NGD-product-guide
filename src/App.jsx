import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Product data - easy to update
const products = [
  // ============ SUNSCREENS ============
  {
    id: 'skinmedica-total-defense-tinted',
    name: 'SkinMedica Total Defense + Repair SPF 34 (Tinted)',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Anti-Aging', 'Antioxidants'],
    trending: false,
    carriedByNGD: true,
    price: '$70',
    overview: 'A tinted broad-spectrum sunscreen with superoxide dismutase (SOD), an antioxidant that helps protect against infrared radiation and environmental damage beyond just UV.',
    verdict: 'An excellent daily sunscreen that goes beyond basic UV protection. The tint evens skin tone while the antioxidant complex provides additional environmental defense. Great for patients who want skincare benefits built into their sun protection.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'skinmedica-total-defense-untinted',
    name: 'SkinMedica Total Defense + Repair SPF 34 (Untinted)',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Anti-Aging', 'Antioxidants'],
    trending: false,
    carriedByNGD: true,
    price: '$70',
    overview: "The untinted version of SkinMedica's environmental protection sunscreen with SOD antioxidant technology. Sheer finish for all skin tones.",
    verdict: 'Same excellent formula as the tinted version without color. Ideal for patients who prefer to add their own tinted products or have very fair/very dark skin tones where the universal tint may not blend well.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'revision-intellishade-original',
    name: 'Revision Intellishade Original SPF 45',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Anti-Aging', 'Hydration'],
    trending: false,
    carriedByNGD: true,
    price: '$84',
    overview: 'A tinted moisturizer with broad-spectrum SPF 45, peptides, and antioxidants. Provides sheer, natural coverage while protecting and treating skin.',
    verdict: 'A multi-tasking product that simplifies morning routines—sunscreen, moisturizer, and light coverage in one. The peptide complex adds anti-aging benefits. Popular with patients who want efficient skincare without multiple layers.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'revision-intellishade-matte',
    name: 'Revision Intellishade Matte SPF 45',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Oily Skin', 'Anti-Aging'],
    trending: false,
    carriedByNGD: true,
    price: '$84',
    overview: 'The mattifying version of Intellishade with the same SPF 45 protection and peptides, formulated to control shine throughout the day.',
    verdict: 'Excellent choice for oily and combination skin types who struggle with midday shine. Provides the same anti-aging benefits as the original but with a more matte, refined finish.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'revision-intellishade-clear',
    name: 'Revision Intellishade Clear SPF 50',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Sensitive Skin', 'Anti-Aging'],
    trending: false,
    carriedByNGD: true,
    price: '$84',
    overview: 'A completely clear, non-tinted version with the highest SPF in the Intellishade line. Same peptide technology without any color.',
    verdict: "The go-to for patients who want the Intellishade benefits without any tint—great for men, those with very dark skin tones, or anyone who layers other products on top. The SPF 50 offers maximum daily protection.",
    lastReviewed: '2025-01-18'
  },
  {
    id: 'revision-intellishade-truphysical',
    name: 'Revision Intellishade TruPhysical SPF 45',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Sensitive Skin', 'Rosacea', 'Anti-Aging'],
    trending: false,
    carriedByNGD: true,
    price: '$84',
    overview: 'A 100% mineral (physical) sunscreen with zinc oxide and titanium dioxide. Tinted formula with the same peptide technology as other Intellishades.',
    verdict: "The best choice for sensitive, rosacea-prone, or reactive skin that can't tolerate chemical filters. Mineral sunscreens sit on top of skin rather than absorbing, making them gentler. The tint helps offset any white cast.",
    lastReviewed: '2025-01-18'
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
    carriedByNGD: false,
    overview: 'European sunscreen formulation with superior UVA protection using Mexoryl filters. Lightweight, minimal white cast.',
    verdict: 'One of the best sunscreens available. The European formulation offers broader UVA protection than most US options. The texture is elegant enough that patients actually use it daily—which is the most important factor in sun protection.',
    lastReviewed: '2025-01-10'
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
    carriedByNGD: false,
    overview: 'A lightweight, oil-free mineral-chemical hybrid sunscreen with niacinamide. Specifically formulated for acne-prone and sensitive skin.',
    verdict: "A top recommendation for patients with acne or rosacea who need daily sun protection. The niacinamide calms inflammation, the zinc oxide provides physical protection, and the formula doesn't trigger breakouts.",
    lastReviewed: '2025-01-22'
  },

  // ============ MOISTURIZERS ============
  {
    id: 'skinmedica-replenish-hydrating',
    name: 'SkinMedica Replenish Hydrating Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dry Skin', 'Hydration', 'Sensitive Skin'],
    trending: false,
    carriedByNGD: true,
    price: '$68',
    overview: 'A rich hydrating cream with vitamin E, squalane, and algae extract. Designed to restore moisture to dry and dehydrated skin.',
    verdict: 'An excellent daily moisturizer for dry skin types. The formula is rich but absorbs well without feeling greasy. Works beautifully as a night cream or for those who need extra hydration year-round.',
    lastReviewed: '2025-01-15'
  },
  {
    id: 'skinmedica-ceramide-cream',
    name: 'SkinMedica TNS Ceramide Treatment Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Barrier Repair', 'Dry Skin', 'Anti-Aging'],
    trending: false,
    carriedByNGD: true,
    price: '$72',
    overview: "A ceramide-rich cream with TNS (Tissue Nutrient Solution) containing growth factors, antioxidants, and peptides for comprehensive skin support.",
    verdict: "Combines the barrier-repair benefits of ceramides with SkinMedica's proprietary growth factor technology. Excellent for mature skin or anyone with a compromised skin barrier who also wants anti-aging benefits.",
    lastReviewed: '2025-01-16'
  },
  {
    id: 'skinmedica-ha5',
    name: 'SkinMedica HA5 Rejuvenating Hydrator',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Hydration', 'Fine Lines', 'Anti-Aging', 'Plumping'],
    trending: false,
    carriedByNGD: true,
    price: '$184',
    overview: "A hyaluronic acid-based hydrator with five different forms of HA at various molecular weights, plus Vitis Flower Stem Cell to support the skin's natural HA production.",
    verdict: 'The gold standard for hyaluronic acid products. The five forms of HA work at different depths for comprehensive hydration. The smoothing effect is immediate and cumulative with continued use. Worth the investment for dehydration-related aging.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'skinmedica-ultra-sheer',
    name: 'SkinMedica Ultra Sheer Moisturizer',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Oily Skin', 'Hydration', 'Lightweight'],
    trending: false,
    carriedByNGD: true,
    price: '$60',
    overview: 'An oil-free, lightweight moisturizer with vitamin C and E. Designed for normal to oily skin that still needs hydration without heaviness.',
    verdict: "Perfect for oily skin types who think they don't need moisturizer. The sheer formula hydrates without adding shine or causing breakouts. A great choice for layering under sunscreen.",
    lastReviewed: '2025-01-14'
  },
  {
    id: 'biopelle-tensage-cream',
    name: 'Biopelle Tensage Soothing Cream with Growth Factors',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Sensitive Skin', 'Post-Procedure', 'Redness'],
    trending: false,
    carriedByNGD: true,
    price: '$180',
    overview: 'A growth factor-rich cream derived from snail secretion (SCA Biorepair Technology). Clinically proven to improve skin texture, tone, and overall appearance.',
    verdict: 'One of the most evidence-backed growth factor products available. The SCA technology has real clinical data supporting its regenerative benefits. Excellent for post-procedure healing and mature skin seeking repair.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'cerave-moisturizing-cream',
    name: 'CeraVe Moisturizing Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dry Skin', 'Eczema', 'Sensitive Skin'],
    trending: false,
    carriedByNGD: false,
    overview: 'A dermatologist-developed moisturizer containing ceramides, hyaluronic acid, and MVE technology for sustained hydration. Fragrance-free and non-comedogenic.',
    verdict: 'An excellent, affordable choice for daily moisturizing. The ceramide complex helps restore the skin barrier, making it particularly useful for patients with compromised skin barriers or eczema-prone skin.',
    lastReviewed: '2025-01-15'
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
    carriedByNGD: false,
    overview: 'A petrolatum-based occlusive ointment with lanolin and panthenol. A dermatology staple for decades.',
    verdict: 'A workhorse product that belongs in every medicine cabinet. Petrolatum is the most effective occlusive we have—it reduces transepidermal water loss by over 98%. Use for extremely dry skin, post-procedure care, or as a "slug" over other products.',
    lastReviewed: '2025-01-20'
  },

  // ============ RETINOIDS ============
  {
    id: 'skinmedica-retinol-025',
    name: 'SkinMedica Retinol Complex 0.25',
    category: 'Retinoid',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Fine Lines', 'Beginners'],
    trending: false,
    carriedByNGD: true,
    price: '$64',
    overview: 'An entry-level retinol at 0.25% concentration with squalane and niacinamide for added hydration and tolerance. Ideal for retinoid beginners.',
    verdict: 'The perfect starting point for retinoid therapy. The low concentration minimizes irritation while the squalane and niacinamide support skin tolerance. Use this for 2-3 months before graduating to higher strengths.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'skinmedica-retinol-05',
    name: 'SkinMedica Retinol Complex 0.5',
    category: 'Retinoid',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Fine Lines', 'Texture', 'Intermediate'],
    trending: false,
    carriedByNGD: true,
    price: '$80',
    overview: 'A mid-strength retinol at 0.5% for patients who have adapted to lower concentrations. Same supportive formula with enhanced efficacy.',
    verdict: "The 'sweet spot' concentration for most patients—strong enough for visible results, tolerable enough for consistent use. Ideal for those who've completed a few months on 0.25% without significant irritation.",
    lastReviewed: '2025-01-18'
  },
  {
    id: 'skinmedica-retinol-10',
    name: 'SkinMedica Retinol Complex 1.0',
    category: 'Retinoid',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Deep Wrinkles', 'Sun Damage', 'Experienced Users'],
    trending: false,
    carriedByNGD: true,
    price: '$96',
    overview: 'The highest OTC retinol concentration from SkinMedica at 1.0%. Maximum strength for experienced retinoid users seeking aggressive anti-aging.',
    verdict: "Reserve this for patients with established retinoid tolerance. At this concentration, you're approaching prescription-level efficacy. Expect some adjustment period even if you've used lower strengths. Results can be dramatic.",
    lastReviewed: '2025-01-18'
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
    carriedByNGD: false,
    overview: 'Prescription-strength vitamin A derivative with decades of research supporting its efficacy for both acne treatment and photoaging.',
    verdict: 'The gold standard for anti-aging and acne. Decades of research support its ability to increase collagen production, speed cell turnover, and improve skin texture. Start low and slow to minimize irritation.',
    lastReviewed: '2025-01-20'
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
    carriedByNGD: false,
    overview: "The first prescription-strength retinoid available over-the-counter. A third-generation retinoid that's more stable and less irritating than tretinoin.",
    verdict: 'Excellent entry point for retinoid therapy. Adapalene is FDA-approved for acne and has evidence for anti-aging benefits, though slightly less potent than tretinoin. Better tolerated by most patients.',
    lastReviewed: '2025-01-16'
  },

  // ============ CLEANSERS ============
  {
    id: 'skinmedica-gentle-cleanser',
    name: 'SkinMedica Facial Cleanser',
    category: 'Cleanser',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sensitive Skin', 'Dry Skin', 'Daily Use'],
    trending: false,
    carriedByNGD: true,
    price: '$40',
    overview: 'A gentle, soap-free cleanser with aloe vera and panthenol. Removes makeup and impurities without stripping the skin barrier.',
    verdict: "A reliable daily cleanser that works for virtually every skin type. Won't interfere with active treatments and maintains the skin's natural moisture. Perfect foundation for any skincare routine.",
    lastReviewed: '2025-01-12'
  },
  {
    id: 'skinmedica-aha-bha-cleanser',
    name: 'SkinMedica AHA/BHA Exfoliating Cleanser',
    category: 'Cleanser',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dull Skin', 'Texture', 'Acne', 'Oily Skin'],
    trending: false,
    carriedByNGD: true,
    price: '$48',
    overview: 'An exfoliating cleanser with glycolic acid (AHA) and salicylic acid (BHA) plus jojoba beads for physical exfoliation. Brightens and smooths.',
    verdict: 'A great option for patients who want exfoliation built into their cleansing step. The dual-acid formula addresses both surface texture and pore congestion. Use 2-3x weekly rather than daily to avoid over-exfoliation.',
    lastReviewed: '2025-01-14'
  },

  // ============ SERUMS & TREATMENTS ============
  {
    id: 'skinmedica-tns-advanced',
    name: 'SkinMedica TNS Advanced+ Serum',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Fine Lines', 'Skin Tone', 'Texture'],
    trending: false,
    carriedByNGD: true,
    price: '$295',
    overview: 'The flagship SkinMedica serum featuring TNS-MR (growth factor blend), peptides, and marine extracts. Targets multiple signs of aging simultaneously.',
    verdict: 'A premium investment in skin aging. The TNS growth factor technology has clinical evidence for improving fine lines, texture, and tone. Patients who commit to consistent use often see significant improvements over 3-6 months.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'skinmedica-even-correct',
    name: 'SkinMedica Even & Correct Advanced Brightening Treatment',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Hyperpigmentation', 'Dark Spots', 'Uneven Tone', 'Melasma'],
    trending: false,
    carriedByNGD: true,
    price: '$178',
    overview: 'A comprehensive brightening serum with tranexamic acid, niacinamide, phenylethyl resorcinol, and phytic acid. Targets pigmentation at multiple pathways.',
    verdict: 'One of the most effective OTC brightening serums available. The multi-pathway approach addresses stubborn hyperpigmentation better than single-ingredient products. Excellent for melasma and post-inflammatory hyperpigmentation.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'revision-vitamin-c-30',
    name: 'Revision Vitamin C Lotion 30%',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Brightening', 'Antioxidants', 'Sun Damage'],
    trending: false,
    carriedByNGD: true,
    price: '$170',
    overview: 'A high-potency 30% THD ascorbate (vitamin C) in a stable, non-irritating formula. Provides antioxidant protection and brightening benefits.',
    verdict: 'An excellent vitamin C option for patients who find L-ascorbic acid too irritating. The THD ascorbate form is stable, penetrates well, and delivers results without the typical vitamin C stinging. Great for sensitive skin.',
    lastReviewed: '2025-01-18'
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
    carriedByNGD: false,
    overview: 'The original patented vitamin C serum combining 15% L-ascorbic acid with vitamin E and ferulic acid for enhanced stability and efficacy.',
    verdict: "The benchmark vitamin C serum. The Duke Antioxidant Patent formulation has solid research behind it. Yes, it's expensive, but the formulation is genuinely superior to most alternatives. Apply in the morning under sunscreen.",
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
    carriedByNGD: false,
    overview: 'A high-concentration niacinamide (vitamin B3) serum with zinc for sebum regulation. Budget-friendly option from a science-focused brand.',
    verdict: 'Great value for a well-researched ingredient. Niacinamide at 5%+ has good evidence for reducing sebum production, improving barrier function, and evening skin tone. Some patients find 10% irritating—if so, use less frequently.',
    lastReviewed: '2025-01-14'
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
    carriedByNGD: false,
    overview: 'Polydeoxyribonucleotide (PDRN) derived from salmon sperm/DNA, trending heavily on social media as the "next big thing" in K-beauty anti-aging.',
    verdict: "The hype outpaces the science. Injectable PDRN shows moderate evidence for wound healing in clinical settings, but it's not FDA-approved in the US. Topical versions have very limited penetration—you're likely just getting an expensive hydrator.",
    lastReviewed: '2025-01-28'
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
    carriedByNGD: false,
    overview: 'Secretion filtrate from snails, popularized by K-beauty for claimed wound healing and anti-aging properties.',
    verdict: "The evidence is thin but it's probably harmless. A few small studies suggest wound healing benefits, but the mechanism and optimal concentration are unclear. It's a decent hydrator. If you enjoy the texture, fine—but don't expect miracles.",
    lastReviewed: '2025-01-24'
  },

  // ============ EYE CARE ============
  {
    id: 'skinmedica-instant-bright-eye',
    name: 'SkinMedica Instant Bright Eye Cream',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dark Circles', 'Puffiness', 'Brightening'],
    trending: false,
    carriedByNGD: true,
    price: '$92',
    overview: 'An eye cream with light-diffusing minerals for immediate brightening plus peptides and caffeine for long-term improvement of dark circles.',
    verdict: 'Delivers both instant and cumulative results. The optical brighteners provide immediate under-eye improvement while the active ingredients work on the underlying discoloration. Great for patients who want both quick fixes and real treatment.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'skinmedica-eye-repair',
    name: 'SkinMedica TNS Eye Repair',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Fine Lines', 'Anti-Aging', 'Crows Feet'],
    trending: false,
    carriedByNGD: true,
    price: '$106',
    overview: 'An advanced eye cream with TNS growth factors, peptides, and marine extracts targeting fine lines, wrinkles, and loss of firmness around the eyes.',
    verdict: 'The anti-aging powerhouse for the eye area. Contains the same TNS technology as the Advanced+ Serum but formulated specifically for the delicate eye area. Best for patients primarily concerned with wrinkles and skin laxity.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'revision-teamine',
    name: 'Revision Teamine Eye Complex',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dark Circles', 'Puffiness', 'Anti-Aging'],
    trending: false,
    carriedByNGD: true,
    price: '$106',
    overview: 'An eye cream with vitamin C esters, vitamin K, and tea complex (caffeine) for addressing dark circles, puffiness, and signs of aging.',
    verdict: 'An excellent all-around eye cream that addresses multiple concerns. The vitamin K helps with vascular-related dark circles while caffeine reduces puffiness. Well-tolerated by most patients.',
    lastReviewed: '2025-01-15'
  },
  {
    id: 'biopelle-tensage-eye',
    name: 'Biopelle Tensage Radiance Eye Cream',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Fine Lines', 'Dark Circles', 'Repair'],
    trending: false,
    carriedByNGD: true,
    price: '$130',
    overview: 'A growth factor eye cream featuring SCA Biorepair Technology derived from snail secretion, plus caffeine and peptides.',
    verdict: 'The same clinically-proven SCA technology as their face cream, optimized for the eye area. Excellent for mature skin seeking repair and regeneration. The growth factors help with both fine lines and skin quality.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'upneeq',
    name: 'Upneeq (Oxymetazoline 0.1%)',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Droopy Eyelids', 'Ptosis', 'Eye Opening'],
    trending: false,
    carriedByNGD: true,
    price: '$200',
    overview: "The first and only FDA-approved prescription eye drop for acquired ptosis (droopy eyelids). Temporarily lifts the upper eyelid by stimulating the Mueller's muscle.",
    verdict: "A game-changer for patients with mild to moderate droopy eyelids who aren't ready for surgery. Results last 6-8 hours. Not a permanent solution, but excellent for special occasions or daily use if the droop is bothersome.",
    lastReviewed: '2025-01-22'
  },
  {
    id: 'latisse-3ml',
    name: 'Latisse (Bimatoprost) 3ml',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Eyelash Growth', 'Thin Lashes', 'Lash Length'],
    trending: false,
    carriedByNGD: true,
    price: '$169',
    overview: 'FDA-approved prescription treatment for inadequate or sparse eyelashes. Bimatoprost extends the growth phase of the lash cycle.',
    verdict: 'The only FDA-approved product for lash growth with strong clinical evidence. Results take 8-16 weeks but are significant. Side effects can include darkening of the eyelid skin and potential iris color changes in some patients.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'latisse-5ml',
    name: 'Latisse (Bimatoprost) 5ml',
    category: 'Eye Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Eyelash Growth', 'Thin Lashes', 'Lash Length'],
    trending: false,
    carriedByNGD: true,
    price: '$219',
    overview: 'The larger size of Latisse for patients committed to ongoing lash enhancement. Better value per ml for long-term use.',
    verdict: "Same excellent product as the 3ml, just more economical for maintenance. Once you've achieved desired results, you'll need to continue use to maintain them—the 5ml makes this more affordable.",
    lastReviewed: '2025-01-18'
  },

  // ============ ACNE CARE ============
  {
    id: 'novice-exfoliant',
    name: 'Novice Exfoliant',
    category: 'Acne Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Acne', 'Texture', 'Blackheads', 'Exfoliation'],
    trending: false,
    carriedByNGD: true,
    price: '$54',
    overview: 'Our house-formulated exfoliant with a blend of alpha and beta hydroxy acids for chemical exfoliation and pore clearing.',
    verdict: "A well-balanced exfoliant we've formulated based on what works for our patients. Effective for acne-prone skin without being overly harsh. Start with 2-3x weekly use and adjust based on tolerance.",
    lastReviewed: '2025-01-20'
  },
  {
    id: 'benzoyl-peroxide-wash',
    name: 'Benzoyl Peroxide Acne Wash 5%',
    category: 'Acne Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Body Acne', 'Bacteria'],
    trending: false,
    carriedByNGD: true,
    price: '$28',
    overview: 'A 5% benzoyl peroxide cleanser that kills acne-causing bacteria. Can be used on face and body.',
    verdict: 'Benzoyl peroxide is a proven acne fighter with decades of evidence. The wash format minimizes irritation compared to leave-on products. Excellent for back and chest acne. Remember: it will bleach towels and fabrics.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'vanishing-act-salicylic',
    name: 'Vanishing Act (Salicylic Acid Spot Treatment)',
    category: 'Acne Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Acne', 'Spot Treatment', 'Blackheads', 'Pores'],
    trending: false,
    carriedByNGD: true,
    price: '$29',
    overview: 'A targeted salicylic acid treatment for individual blemishes. Helps clear pores and reduce inflammation quickly.',
    verdict: 'A handy spot treatment for occasional breakouts. Salicylic acid penetrates pores to clear congestion. Apply to individual pimples at the first sign of trouble for best results.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'purifying-clay-mask',
    name: 'Purifying Clay Mask',
    category: 'Acne Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Oily Skin', 'Pores', 'Detox', 'Weekly Treatment'],
    trending: false,
    carriedByNGD: true,
    price: '$54',
    overview: 'A kaolin and bentonite clay mask that absorbs excess oil and draws out impurities. For weekly deep cleansing.',
    verdict: 'A nice addition to an acne routine for oil control. Clay masks provide a satisfying "deep clean" feeling and can temporarily minimize pore appearance. Use weekly—more frequent use can be drying.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'paulas-choice-bha',
    name: "Paula's Choice 2% BHA Liquid Exfoliant",
    category: 'Acne Care',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Blackheads', 'Enlarged Pores', 'Texture'],
    trending: false,
    carriedByNGD: false,
    overview: 'A leave-on salicylic acid exfoliant at the optimal 2% concentration and pH for effectiveness. Fragrance-free formula.',
    verdict: 'A well-formulated BHA that does exactly what it claims. Salicylic acid is oil-soluble, so it penetrates pores to reduce congestion and blackheads. Use 2-3x weekly to start. Excellent for oily and acne-prone skin.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'beef-tallow',
    name: 'Beef Tallow Skincare',
    category: 'Acne Care',
    rating: 'not-recommended',
    ratingLabel: 'Not Recommended',
    evidence: 'None',
    concerns: ['Dry Skin', 'Eczema'],
    trending: true,
    carriedByNGD: false,
    overview: 'Rendered beef fat marketed as a "natural" alternative to conventional moisturizers, popularized by social media claims about ancestral skincare.',
    verdict: "Skip it. There's no clinical evidence supporting beef tallow over proven moisturizers. It's comedogenic for many skin types, can cause contact dermatitis, and lacks the ceramides and humectants that actually repair the skin barrier.",
    lastReviewed: '2025-01-25'
  },
  {
    id: 'at-home-microneedling',
    name: 'At-Home Microneedling Devices',
    category: 'Acne Care',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Moderate',
    concerns: ['Scarring', 'Texture', 'Anti-Aging'],
    trending: true,
    carriedByNGD: false,
    overview: 'Consumer microneedling devices (dermarollers, pens) with needle depths typically 0.25-0.5mm, marketed for collagen stimulation and product absorption.',
    verdict: "Proceed carefully. At-home devices can't reach the depths needed for true collagen remodeling. They may improve product absorption but also carry infection and scarring risks. For real results, professional microneedling is worth the investment.",
    lastReviewed: '2025-01-22'
  },

  // ============ SPECIALTY ============
  {
    id: 'revision-nectifirm-advanced',
    name: 'Revision Nectifirm Advanced',
    category: 'Specialty',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Neck Firmness', 'Neck Lines', 'Jawline', 'Anti-Aging'],
    trending: false,
    carriedByNGD: true,
    price: '$154',
    overview: 'A neck and décolletage cream with peptides, plant extracts, and antioxidants. Specifically formulated for the thinner, more delicate skin of the neck.',
    verdict: 'The gold standard for OTC neck care. The neck ages differently than the face and needs targeted treatment. Patients consistently report improvement in firmness and texture. Apply twice daily with upward strokes.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'nutrafol-womens-balance',
    name: "Nutrafol Women's Balance",
    category: 'Specialty',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Hair Thinning', 'Hair Growth', 'Menopause', 'Hair Health'],
    trending: false,
    carriedByNGD: true,
    price: '$209',
    overview: 'A physician-formulated hair growth supplement for women 45+ with clinically tested botanicals, including saw palmetto, ashwagandha, and marine collagen.',
    verdict: 'The best-studied hair supplement for menopausal and post-menopausal women. Clinical trials show improvement in hair growth and thickness over 6 months. Addresses the hormonal component of hair thinning. Requires consistent daily use.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'nutrafol-men',
    name: 'Nutrafol Men',
    category: 'Specialty',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Hair Thinning', 'Hair Growth', 'Male Pattern Baldness', 'Hair Health'],
    trending: false,
    carriedByNGD: true,
    price: '$209',
    overview: 'A physician-formulated hair growth supplement for men with saw palmetto, ashwagandha, marine collagen, and DHT-blocking botanicals.',
    verdict: 'A comprehensive approach to male hair thinning that addresses multiple pathways including DHT and stress. Clinical evidence supports its efficacy. Can be used alongside minoxidil or finasteride for enhanced results.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'skinmedica-scar-recovery',
    name: 'SkinMedica Scar Recovery Gel',
    category: 'Specialty',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Scars', 'Surgical Scars', 'Wound Healing', 'Keloids'],
    trending: false,
    carriedByNGD: true,
    price: '$46',
    overview: 'A silicone-based gel with vitamin C and growth factors for scar prevention and treatment. For use on healing or established scars.',
    verdict: 'Silicone is the gold standard for scar management, and this adds beneficial actives on top. Start using once wounds are closed (no open areas). Most effective on newer scars but can also improve the appearance of older ones over time.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'topix-stretchmark-cream',
    name: 'Topix Replenix Stretchmark Cream',
    category: 'Specialty',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Stretch Marks', 'Pregnancy', 'Weight Changes', 'Prevention'],
    trending: false,
    carriedByNGD: true,
    price: '$50',
    overview: 'A preventive stretch mark cream with ceramides, peptides, and botanical extracts. Best used during pregnancy or periods of rapid weight change.',
    verdict: "Prevention is key with stretch marks—once they form, they're difficult to treat. This keeps skin elastic and hydrated during high-risk periods. Start early in pregnancy and apply twice daily to prone areas.",
    lastReviewed: '2025-01-16'
  },

  // ============ POST-PROCEDURE ============
  {
    id: 'auraderm-bruise',
    name: 'Auraderm Post-Bruise Cream',
    category: 'Post-Procedure',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Bruising', 'Post-Injection', 'Recovery'],
    trending: false,
    carriedByNGD: true,
    price: '$18',
    overview: 'A vitamin K-based cream designed to speed resolution of bruising after cosmetic procedures, injections, or trauma.',
    verdict: 'Helps bruises fade faster when applied consistently. Best started immediately after a procedure. The vitamin K helps break down hemoglobin trapped under the skin. Affordable and worthwhile for post-filler or post-Botox care.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'arnika-forte',
    name: 'Arnika Forte Homeopathic Arnica',
    category: 'Post-Procedure',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Bruising', 'Swelling', 'Post-Procedure', 'Recovery'],
    trending: false,
    carriedByNGD: true,
    price: '$39',
    overview: 'An oral arnica montana supplement in sublingual pellet form. Traditionally used to reduce bruising and swelling after procedures.',
    verdict: "Arnica has been used for centuries for bruising, and many patients swear by it. The evidence is mixed but it's safe to try. Start a few days before procedures and continue for a week after for best results.",
    lastReviewed: '2025-01-12'
  },
  {
    id: 'bio-amps-40-gf',
    name: 'Biopelle Tensage Daily Serum (Bio Amps 40 GF)',
    category: 'Post-Procedure',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Post-Procedure', 'Healing', 'Anti-Aging', 'Repair'],
    trending: false,
    carriedByNGD: true,
    price: '$136',
    overview: 'A daily growth factor serum with SCA Biorepair Technology. Accelerates healing and improves skin quality post-procedure or as daily anti-aging.',
    verdict: 'Excellent for post-laser, post-peel, or post-microneedling recovery. The growth factors speed healing and improve outcomes. Also works well as a daily anti-aging serum between procedures.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'bio-amps-50',
    name: 'Biopelle Tensage Intensive Serum (Bio Amps 50)',
    category: 'Post-Procedure',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Post-Procedure', 'Intensive Repair', 'Anti-Aging', 'Healing'],
    trending: false,
    carriedByNGD: true,
    price: '$195',
    overview: 'The highest concentration of SCA growth factors available OTC. For intensive repair after aggressive procedures or for maximum anti-aging.',
    verdict: 'Reserve this for post-ablative laser or when skin needs serious repair. The concentration is higher than the daily serum and delivers more intensive regeneration. Can also be used as a treatment course for aging skin.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'oxygenetix-foundation',
    name: 'Oxygenetix Oxygenating Foundation',
    category: 'Post-Procedure',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Post-Procedure', 'Coverage', 'Healing', 'Camouflage'],
    trending: false,
    carriedByNGD: true,
    price: '$66',
    overview: 'A breathable, aloe-based foundation that can be worn immediately after procedures. Contains ceravitae to promote healing while providing coverage.',
    verdict: 'The only foundation we recommend immediately post-procedure. The formula is truly breathable and supports healing rather than impeding it. Great for covering bruising after injectables or redness after lasers. Multiple shades available.',
    lastReviewed: '2025-01-18'
  },

  // ============ PROCEDURES ============
  {
    id: 'botox',
    name: 'Botox / Dysport / Xeomin',
    category: 'Procedures',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Wrinkles', 'Fine Lines', 'Crow\'s Feet', 'Forehead Lines', 'Frown Lines'],
    trending: false,
    carriedByNGD: true,
    price: 'Consultation required',
    overview: 'Neuromodulators that temporarily relax muscles causing dynamic wrinkles. FDA-approved for cosmetic use with decades of safety data.',
    verdict: 'The gold standard for treating dynamic wrinkles. Results last 3-4 months. We use all three brands and can help determine which is best for your needs. Preventative use in your 20s-30s can delay wrinkle formation.',
    lastReviewed: '2025-01-25'
  },
  {
    id: 'dermal-fillers',
    name: 'Dermal Fillers (Juvederm, Restylane, RHA)',
    category: 'Procedures',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Volume Loss', 'Nasolabial Folds', 'Lip Enhancement', 'Cheek Volume', 'Under-Eye Hollows'],
    trending: false,
    carriedByNGD: true,
    price: 'Consultation required',
    overview: 'Hyaluronic acid-based injectables that restore volume, smooth lines, and enhance facial contours. Multiple formulations for different areas and goals.',
    verdict: 'Safe, reversible, and natural-looking when done well. Results last 6-18 months depending on the product and area. We carry the full range of Juvederm, Restylane, and RHA products to customize your treatment.',
    lastReviewed: '2025-01-25'
  },
  {
    id: 'clear-brilliant',
    name: 'Clear + Brilliant Laser',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Skin Texture', 'Pore Size', 'Early Signs of Aging', 'Skin Tone', 'Prevention'],
    trending: false,
    carriedByNGD: true,
    price: 'Starting at $350',
    overview: 'A gentle fractionated laser that creates microscopic treatment zones to stimulate collagen and improve skin quality. Minimal downtime.',
    verdict: 'The "baby Fraxel" for patients who want laser benefits without significant downtime. Perfect for maintenance, prevention, or those new to lasers. Best results with a series of treatments.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'fraxel',
    name: 'Fraxel Laser Resurfacing',
    category: 'Procedures',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Sun Damage', 'Acne Scars', 'Wrinkles', 'Texture', 'Hyperpigmentation'],
    trending: false,
    carriedByNGD: true,
    price: 'Starting at $1,200',
    overview: 'Fractionated resurfacing laser that treats a portion of skin at a time, allowing faster healing while delivering dramatic results for aging, scarring, and sun damage.',
    verdict: 'One of the most effective treatments for photodamage and acne scarring. Expect 3-5 days of significant redness and peeling. Results are long-lasting and often transformative. Not for darker skin tones.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'ipl-photofacial',
    name: 'IPL Photofacial',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Spots', 'Redness', 'Rosacea', 'Broken Capillaries', 'Uneven Tone'],
    trending: false,
    carriedByNGD: true,
    price: 'Starting at $400',
    overview: 'Intense Pulsed Light therapy that targets pigment and vascular concerns. Treats brown spots, redness, and broken blood vessels with minimal downtime.',
    verdict: 'Excellent for addressing sun damage and redness. Brown spots will darken and flake off over 1-2 weeks. Best results with a series of 3-5 treatments. Not suitable for darker skin tones.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'microneedling-prp',
    name: 'Microneedling with PRP',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne Scars', 'Fine Lines', 'Skin Texture', 'Collagen Production'],
    trending: false,
    carriedByNGD: true,
    price: 'Starting at $600',
    overview: 'Professional microneedling creates controlled micro-injuries while PRP (platelet-rich plasma) from your own blood accelerates healing and collagen production.',
    verdict: 'Much more effective than at-home devices. The professional depth (1.5-2mm) actually stimulates collagen remodeling. PRP enhances results. Excellent for acne scars and general rejuvenation. Safe for all skin tones.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'chemical-peels',
    name: 'Chemical Peels (Professional)',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Hyperpigmentation', 'Texture', 'Fine Lines', 'Dull Skin'],
    trending: false,
    carriedByNGD: true,
    price: 'Starting at $150',
    overview: 'Professional-strength acid peels (glycolic, salicylic, TCA, etc.) that remove damaged outer layers to reveal fresher, smoother skin beneath.',
    verdict: 'More effective than OTC products due to higher concentrations and proper application. We offer peels ranging from no-downtime lunchtime peels to more aggressive treatments. Regular peels maintain results from other procedures.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'hydrafacial',
    name: 'HydraFacial',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Hydration', 'Pores', 'Congestion', 'Glow', 'Maintenance'],
    trending: true,
    carriedByNGD: true,
    price: 'Starting at $199',
    overview: 'A multi-step treatment that cleanses, exfoliates, extracts, and hydrates using patented Vortex-Fusion technology. Customizable with boosters for specific concerns.',
    verdict: 'A great "red carpet" treatment for instant glow with zero downtime. Best for maintenance and hydration rather than correcting major concerns. Popular before events. Can be combined with other treatments.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'kybella',
    name: 'Kybella (Deoxycholic Acid)',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Double Chin', 'Submental Fat', 'Jawline Definition'],
    trending: false,
    carriedByNGD: true,
    price: 'Consultation required',
    overview: 'Injectable treatment that permanently destroys fat cells under the chin. FDA-approved for submental fat reduction.',
    verdict: 'The only FDA-approved injectable for double chin. Results are permanent once fat cells are destroyed. Expect significant swelling for 1-2 weeks after each treatment. Most patients need 2-4 sessions.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'laser-hair-removal',
    name: 'Laser Hair Removal',
    category: 'Procedures',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Unwanted Hair', 'Ingrown Hairs', 'Razor Bumps'],
    trending: false,
    carriedByNGD: true,
    price: 'Varies by area',
    overview: 'Laser energy targets pigment in hair follicles to permanently reduce hair growth. Most effective for light skin with dark hair.',
    verdict: 'The gold standard for permanent hair reduction. Requires 6-8 sessions for optimal results. Works best on dark hair; not effective for blonde, gray, or red hair. Newer lasers can safely treat darker skin tones.',
    lastReviewed: '2025-01-15'
  },
  {
    id: 'morpheus8',
    name: 'Morpheus8 RF Microneedling',
    category: 'Procedures',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Skin Laxity', 'Wrinkles', 'Acne Scars', 'Jowls', 'Body Contouring'],
    trending: true,
    carriedByNGD: true,
    price: 'Starting at $800',
    overview: 'Combines microneedling with radiofrequency energy to tighten skin and remodel collagen at deeper levels than traditional microneedling.',
    verdict: 'One of the most effective non-surgical options for skin tightening. The RF energy reaches deeper tissues for more significant lifting. Expect 3-5 days of redness and swelling. Safe for all skin tones.',
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
  'Retinoid': {
    icon: '💊',
    slug: 'retinoids',
    description: 'Anti-aging & acne',
    color: '#ec4899'
  },
  'Cleanser': {
    icon: '🫧',
    slug: 'cleansers',
    description: 'Gentle cleansing & prep',
    color: '#06b6d4'
  },
  'Serum': {
    icon: '✨',
    slug: 'serums',
    description: 'Targeted treatments',
    color: '#8b5cf6'
  },
  'Eye Care': {
    icon: '👁️',
    slug: 'eye-care',
    description: 'Eye creams & treatments',
    color: '#14b8a6'
  },
  'Acne Care': {
    icon: '🎯',
    slug: 'acne-care',
    description: 'Blemish control & prevention',
    color: '#f43f5e'
  },
  'Specialty': {
    icon: '⭐',
    slug: 'specialty',
    description: 'Neck, hair & targeted care',
    color: '#a855f7'
  },
  'Post-Procedure': {
    icon: '🩹',
    slug: 'post-procedure',
    description: 'Recovery & healing support',
    color: '#64748b'
  },
  'Procedures': {
    icon: '✨',
    slug: 'procedures',
    description: 'In-office treatments & lasers',
    color: '#0ea5e9'
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
  const [ngdOnlyFilter, setNgdOnlyFilter] = useState(false);
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
      const matchesNGD = !ngdOnlyFilter || product.carriedByNGD;
      return matchesSearch && matchesCategory && matchesRating && matchesNGD;
    });
  }, [search, categoryFilter, ratingFilter, ngdOnlyFilter]);

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
          {product.carriedByNGD && (
            <span className="ngd-tag">
              Available at NGD {product.price && <span className="ngd-price">{product.price}</span>}
            </span>
          )}
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
                <label className="ngd-filter-toggle">
                  <input
                    type="checkbox"
                    checked={ngdOnlyFilter}
                    onChange={(e) => setNgdOnlyFilter(e.target.checked)}
                  />
                  <span>Available at NGD only</span>
                </label>
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
                  const matchesNGD = !ngdOnlyFilter || product.carriedByNGD;
                  return matchesSearch && matchesRating && matchesNGD;
                })
                .map(product => renderProductCard(product))}
            </div>

            {(activeCategory ? categoryProducts : filteredProducts).filter(product => {
              const matchesSearch = search === '' ||
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.concerns.some(c => c.toLowerCase().includes(search.toLowerCase()));
              const matchesRating = ratingFilter === 'all' || product.rating === ratingFilter;
              const matchesNGD = !ngdOnlyFilter || product.carriedByNGD;
              return matchesSearch && matchesRating && matchesNGD;
            }).length === 0 && (
              <div className="no-results">
                <p>No products match your search.</p>
                <button onClick={() => { setSearch(''); setRatingFilter('all'); setNgdOnlyFilter(false); }}>
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

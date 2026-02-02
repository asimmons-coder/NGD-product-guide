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
  },
  // CLEANSERS
  {
    id: 'cerave-hydrating-cleanser',
    name: 'CeraVe Hydrating Facial Cleanser',
    category: 'Cleanser',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Dry Skin', 'Sensitive Skin', 'Eczema'],
    trending: false,
    overview: 'A gentle, non-foaming cleanser with ceramides and hyaluronic acid. Developed with dermatologists and carries the National Eczema Association seal.',
    verdict: 'The benchmark for gentle cleansing. Won\'t strip your skin, maintains the moisture barrier, and works for virtually every skin type. Perfect for dry, sensitive, or eczema-prone skin. Use morning and night without worry.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'la-roche-posay-toleriane',
    name: 'La Roche-Posay Toleriane Hydrating Gentle Cleanser',
    category: 'Cleanser',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sensitive Skin', 'Dry Skin', 'Rosacea'],
    trending: false,
    overview: 'A milky, creamy cleanser with prebiotic thermal water, ceramide-3, niacinamide, and glycerin. Fragrance-free and soap-free.',
    verdict: 'Excellent for sensitive and reactive skin types. The prebiotic thermal water helps support skin microbiome health. Leaves skin feeling soft without that tight, stripped sensation. A solid alternative to CeraVe.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'vanicream-gentle-cleanser',
    name: 'Vanicream Gentle Facial Cleanser',
    category: 'Cleanser',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sensitive Skin', 'Eczema', 'Redness'],
    trending: false,
    overview: 'Ultra-gentle cleanser free of dyes, fragrance, parabens, lanolin, and formaldehyde. Originally developed for cancer patients undergoing radiation.',
    verdict: 'The purest gentle cleanser option available. When patients react to everything, Vanicream is our go-to recommendation. Does exactly what a cleanser should do—clean without irritating—and nothing more.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'cerave-foaming-cleanser',
    name: 'CeraVe Foaming Facial Cleanser',
    category: 'Cleanser',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Oily Skin', 'Acne', 'Enlarged Pores'],
    trending: false,
    overview: 'A foaming cleanser with ceramides, hyaluronic acid, and niacinamide. Designed for normal to oily skin types.',
    verdict: 'The oily skin counterpart to the Hydrating Cleanser. Provides a satisfying foam without over-stripping. The niacinamide helps with oil control. Excellent choice for acne-prone skin that still wants barrier protection.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'cetaphil-gentle-cleanser',
    name: 'Cetaphil Gentle Skin Cleanser',
    category: 'Cleanser',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Extensive',
    concerns: ['Sensitive Skin', 'Dry Skin', 'All Skin Types'],
    trending: false,
    overview: 'A classic, soap-free cleanser that\'s been a dermatology staple for over 70 years. Can be used with or without water.',
    verdict: 'A tried-and-true classic. While newer formulations from CeraVe and La Roche-Posay offer additional benefits like ceramides, Cetaphil remains an excellent, affordable option. If it works for you, there\'s no need to switch.',
    lastReviewed: '2025-01-08'
  },
  {
    id: 'youth-to-people-cleanser',
    name: 'Youth To The People Superfood Cleanser',
    category: 'Cleanser',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Oily Skin', 'Dull Skin', 'Antioxidants'],
    trending: true,
    overview: 'A green gel cleanser with kale, spinach, and green tea extracts. Marketed as a superfood antioxidant cleanse.',
    verdict: 'A fine cleanser at a premium price. The "superfood" antioxidants have minimal contact time and get washed off, so they provide negligible benefit. The formula itself is decent but can be drying for some. You\'re paying for marketing, not efficacy.',
    lastReviewed: '2025-01-20'
  },
  // ADDITIONAL SUNSCREENS
  {
    id: 'supergoop-unseen',
    name: 'Supergoop Unseen Sunscreen SPF 40',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Oily Skin', 'Makeup Primer'],
    trending: true,
    overview: 'A weightless, invisible, scentless chemical sunscreen with a primer-like finish. Oil-free with no white cast.',
    verdict: 'A game-changer for those who hate wearing sunscreen. The texture is truly invisible and works beautifully under makeup. Solid broad-spectrum protection. The price point is high, but for patients who otherwise skip sunscreen, it\'s worth it.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'blue-lizard-sensitive',
    name: 'Blue Lizard Sensitive Mineral Sunscreen SPF 50+',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Sensitive Skin', 'Eczema', 'Kids'],
    trending: false,
    overview: 'A 100% mineral sunscreen with zinc oxide and titanium dioxide. Smart bottle technology changes color in UV light. Australian formulation.',
    verdict: 'One of the best mineral sunscreens available, especially for sensitive skin and children. Yes, there\'s some white cast, but that\'s the trade-off for truly gentle sun protection. The smart bottle is a clever reminder to reapply.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'neutrogena-hydro-boost-spf',
    name: 'Neutrogena Hydro Boost Water Gel Lotion SPF 50',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Dry Skin', 'Hydration'],
    trending: false,
    overview: 'A water-gel sunscreen with hyaluronic acid for hydration. Lightweight, non-greasy formula that absorbs quickly.',
    verdict: 'A solid drugstore option that combines sun protection with hydration. The texture is pleasant and layers well. Great for those with dry skin who find most sunscreens too matte. Affordable and widely available.',
    lastReviewed: '2025-01-10'
  },
  {
    id: 'black-girl-sunscreen',
    name: 'Black Girl Sunscreen SPF 30',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Dark Skin Tones', 'No White Cast'],
    trending: false,
    overview: 'A chemical sunscreen specifically formulated to be invisible on melanin-rich skin. Contains jojoba, cacao, and avocado for moisture.',
    verdict: 'Finally, a sunscreen designed with darker skin tones in mind. Truly no white cast, moisturizing without being greasy. Everyone needs sun protection regardless of skin tone, and this removes the biggest barrier to compliance for many patients.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'canmake-mermaid-uv',
    name: 'Canmake Mermaid Skin Gel UV SPF 50+',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Oily Skin', 'Makeup Primer', 'Light Skin'],
    trending: true,
    overview: 'A cult-favorite Japanese sunscreen with a dewy, gel-like finish. Contains newer UV filters approved in Japan but not the US.',
    verdict: 'Exceptional texture and protection. Japanese sunscreens use newer, more elegant UV filters. The finish is dewy, which some love and others find too shiny. May not be ideal for very oily skin, but excellent for those who want a glowing base.',
    lastReviewed: '2025-01-24'
  },
  {
    id: 'colorescience-sunforgettable',
    name: 'Colorescience Sunforgettable Total Protection SPF 50',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Sensitive Skin', 'Rosacea', 'Post-Procedure'],
    trending: false,
    overview: 'A mineral powder sunscreen in a brush applicator. Contains EnviroScreen technology for pollution protection. Comes in multiple shades.',
    verdict: 'Perfect for reapplication over makeup or when traditional sunscreens aren\'t practical. We recommend this to post-procedure patients and those with rosacea who can\'t tolerate liquid formulas. Not a substitute for proper initial application, but excellent as a midday touch-up.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'isntree-hyaluronic-acid-sun',
    name: 'Isntree Hyaluronic Acid Watery Sun Gel SPF 50+',
    category: 'Sunscreen',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Sun Protection', 'Hydration', 'Sensitive Skin', 'Light Feel'],
    trending: true,
    overview: 'A Korean watery gel sunscreen with 8 types of hyaluronic acid. Chemical filters with a lightweight, hydrating finish. No alcohol, fragrance-free option available.',
    verdict: 'One of the best examples of Korean sunscreen innovation. The watery texture absorbs instantly with zero white cast. Genuinely hydrating, not just non-drying. Excellent for layering in a multi-step routine. The formula keeps improving.',
    lastReviewed: '2025-01-26'
  },
  // ADDITIONAL MOISTURIZERS
  {
    id: 'vanicream-moisturizing-cream',
    name: 'Vanicream Moisturizing Skin Cream',
    category: 'Moisturizer',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Dry Skin', 'Eczema', 'Sensitive Skin', 'Psoriasis'],
    trending: false,
    overview: 'An ultra-bland moisturizing cream free of dyes, fragrance, lanolin, parabens, and formaldehyde releasers. Dermatologist-recommended for decades.',
    verdict: 'When you need moisture without any risk of irritation. This is what we reach for when patients have failed everything else. No frills, no fancy ingredients—just pure, effective moisturization. Should be in every eczema patient\'s routine.',
    lastReviewed: '2025-01-15'
  },
  {
    id: 'neutrogena-hydro-boost',
    name: 'Neutrogena Hydro Boost Water Gel',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Oily Skin', 'Hydration', 'Lightweight'],
    trending: false,
    overview: 'A lightweight, oil-free gel moisturizer with hyaluronic acid. Designed for normal to oily skin that still needs hydration.',
    verdict: 'Excellent for oily skin types who think they don\'t need moisturizer. The gel texture provides hydration without heaviness. Contains fragrance, which may bother sensitive skin—the fragrance-free version is available. Good drugstore option.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'first-aid-beauty-ultra-repair',
    name: 'First Aid Beauty Ultra Repair Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dry Skin', 'Eczema', 'Sensitive Skin', 'Redness'],
    trending: false,
    overview: 'A rich cream with colloidal oatmeal, shea butter, and allantoin. Formulated to relieve dry, distressed skin and eczema flare-ups.',
    verdict: 'A solid eczema-friendly option with a slightly more elegant feel than clinical brands. The colloidal oatmeal provides anti-itch benefits backed by evidence. More expensive than Vanicream or CeraVe but cosmetically appealing.',
    lastReviewed: '2025-01-08'
  },
  {
    id: 'la-roche-posay-cicaplast',
    name: 'La Roche-Posay Cicaplast Baume B5',
    category: 'Moisturizer',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Wound Healing', 'Post-Procedure', 'Dry Skin', 'Irritation', 'Tattoo Care'],
    trending: false,
    overview: 'A multi-purpose balm with panthenol (vitamin B5), madecassoside, zinc, and shea butter. Designed for irritated, damaged skin.',
    verdict: 'A dermatology workhorse. We recommend this post-procedure, for healing tattoos, for chapped lips and hands, and for any irritated skin. The panthenol accelerates repair, and the texture creates a protective barrier. Keep it in your medicine cabinet.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'eucerin-original-healing',
    name: 'Eucerin Original Healing Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Very Dry Skin', 'Cracked Skin', 'Rough Skin'],
    trending: false,
    overview: 'A rich, fragrance-free formula with lanolin and mineral oil. Designed for very dry, compromised skin.',
    verdict: 'Sometimes you just need something heavy-duty. This is excellent for extremely dry skin, rough patches, and cracked heels. The lanolin can cause reactions in some, but for those who tolerate it, this is deeply moisturizing.',
    lastReviewed: '2025-01-06'
  },
  {
    id: 'kiehls-ultra-facial',
    name: 'Kiehl\'s Ultra Facial Cream',
    category: 'Moisturizer',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Moderate',
    concerns: ['Hydration', 'Dry Skin', 'All Skin Types'],
    trending: false,
    overview: 'A lightweight cream with squalane and glacial glycoprotein. Marketed for 24-hour hydration in all skin types and climates.',
    verdict: 'A decent moisturizer at a luxury price point. The formula is fine but unremarkable—squalane is the main player. You can get equivalent or better hydration from CeraVe or Vanicream at a fraction of the cost. Paying for the brand experience.',
    lastReviewed: '2025-01-10'
  },
  {
    id: 'tatcha-dewy-skin',
    name: 'Tatcha The Dewy Skin Cream',
    category: 'Moisturizer',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Hydration', 'Anti-Aging', 'Dry Skin', 'Glow'],
    trending: true,
    overview: 'A rich purple cream with Japanese anti-aging ingredients, hyaluronic acid, and botanical extracts. Known for its "dewy" finish.',
    verdict: 'Luxurious texture, beautiful packaging, premium price. The ingredients aren\'t bad—hyaluronic acid and botanical extracts—but nothing here justifies the $70+ cost. If it brings you joy and fits your budget, enjoy it. But it\'s not doing more than affordable alternatives.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'illiyoon-ceramide-ato',
    name: 'Illiyoon Ceramide Ato Concentrate Cream',
    category: 'Moisturizer',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dry Skin', 'Eczema', 'Sensitive Skin', 'Barrier Repair'],
    trending: true,
    overview: 'A Korean pharmacy brand cream with ceramides and a patented skin barrier complex. Thick texture, minimal ingredients, fragrance-free.',
    verdict: 'An excellent value alternative to Western ceramide creams. The texture is rich but absorbs well. Trusted in Korean dermatology clinics for eczema and barrier repair. Large sizes make this very economical. A hidden gem.',
    lastReviewed: '2025-01-25'
  },
  // ADDITIONAL SERUMS
  {
    id: 'timeless-vitamin-c',
    name: 'Timeless 20% Vitamin C + E + Ferulic Acid Serum',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Hyperpigmentation', 'Brightening', 'Sun Damage'],
    trending: false,
    overview: 'A dupe for SkinCeuticals C E Ferulic at a fraction of the price. Contains 20% L-ascorbic acid, vitamin E, and ferulic acid.',
    verdict: 'The best budget alternative to SkinCeuticals. Same key formula at about 1/5 the price. Make sure to buy fresh (check batch dates) and store in the fridge. When it oxidizes and turns orange, discard it. Incredible value for a well-researched formulation.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'the-ordinary-hyaluronic',
    name: 'The Ordinary Hyaluronic Acid 2% + B5',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Hydration', 'Dry Skin', 'Fine Lines', 'Plumping'],
    trending: false,
    overview: 'A hydrating serum with three molecular weights of hyaluronic acid plus vitamin B5. Budget-friendly from the science-focused brand.',
    verdict: 'A solid hyaluronic acid serum at an unbeatable price. Works best applied to damp skin and sealed with a moisturizer. Some find the texture slightly sticky—if so, use less. A staple for adding hydration to any routine.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'good-molecules-discoloration',
    name: 'Good Molecules Discoloration Correcting Serum',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Hyperpigmentation', 'Dark Spots', 'Uneven Tone', 'Melasma'],
    trending: false,
    overview: 'A tranexamic acid serum with niacinamide and azelaic acid for targeting discoloration. Affordable, fragrance-free formula.',
    verdict: 'Tranexamic acid is genuinely effective for hyperpigmentation and has good evidence for melasma specifically. This is an accessible, well-formulated option. Takes 8-12 weeks to see results. Pair with sunscreen—always.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'paulas-choice-azelaic',
    name: 'Paula\'s Choice 10% Azelaic Acid Booster',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Rosacea', 'Hyperpigmentation', 'Texture'],
    trending: false,
    overview: 'A 10% azelaic acid treatment with salicylic acid. Targets acne, rosacea redness, and post-inflammatory hyperpigmentation.',
    verdict: 'Azelaic acid is underrated and versatile—it addresses acne, rosacea, and pigmentation with minimal irritation. Prescription strength is 15-20%, but 10% OTC is still effective. Great for patients who can\'t tolerate retinoids.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'naturium-tranexamic',
    name: 'Naturium Tranexamic Acid Serum 5%',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Hyperpigmentation', 'Melasma', 'Dark Spots', 'Uneven Tone'],
    trending: false,
    overview: 'A 5% tranexamic acid serum with niacinamide, licorice root, and kojic acid. Targets stubborn discoloration and melasma.',
    verdict: 'A comprehensive brightening serum at a great price point. Tranexamic acid works differently than other brighteners, making it a good addition to a fading regimen. Best results when combined with vitamin C and sunscreen.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'inkey-list-retinol',
    name: 'The Inkey List Retinol Serum',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Fine Lines', 'Acne', 'Texture'],
    trending: false,
    overview: 'A stabilized retinol serum with squalane for added moisture. Entry-level retinol at a budget-friendly price.',
    verdict: 'A good beginner retinol for those not ready for prescription tretinoin or OTC adapalene. The squalane helps buffer potential irritation. Use 2-3 times weekly to start, building tolerance gradually.',
    lastReviewed: '2025-01-15'
  },
  {
    id: 'cos-de-baha-azelaic',
    name: 'Cos De BAHA Azelaic Acid 10% Serum',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Rosacea', 'Hyperpigmentation', 'Sensitive Skin'],
    trending: false,
    overview: 'A 10% azelaic acid serum with niacinamide and aloe vera. Korean formulation focused on calming and brightening.',
    verdict: 'An excellent budget azelaic acid option. The formula is gentle enough for sensitive and rosacea-prone skin. Use morning or night—it plays well with most other actives. Great alternative to more expensive Western options.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'beauty-of-joseon-glow',
    name: 'Beauty of Joseon Glow Serum: Propolis + Niacinamide',
    category: 'Serum',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Dull Skin', 'Hydration', 'Acne', 'Redness'],
    trending: true,
    overview: 'A niacinamide serum with propolis extract for glow and calming. Honey-like texture, lightweight finish.',
    verdict: 'A well-formulated K-beauty option. The propolis adds antimicrobial and antioxidant benefits alongside niacinamide\'s sebum control and brightening. Beautiful texture that layers well. Good value for the ingredient quality.',
    lastReviewed: '2025-01-24'
  },
  // ADDITIONAL RETINOIDS
  {
    id: 'cerave-resurfacing-retinol',
    name: 'CeraVe Resurfacing Retinol Serum',
    category: 'Retinoid',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Acne Marks', 'Texture', 'Fine Lines'],
    trending: false,
    overview: 'An encapsulated retinol serum with licorice root and niacinamide. Formulated with ceramides for barrier protection.',
    verdict: 'An excellent entry point for retinoid therapy. The encapsulated retinol releases gradually, reducing irritation. The supporting ingredients help with post-acne marks. Great for beginners or those with sensitive skin who want retinoid benefits.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'the-ordinary-retinol-1',
    name: 'The Ordinary Retinol 1% in Squalane',
    category: 'Retinoid',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Texture', 'Fine Lines', 'Experienced Users'],
    trending: false,
    overview: 'A high-strength retinol (1%) in squalane for lubrication. Part of The Ordinary\'s retinoid range from 0.2% to 1%.',
    verdict: '1% retinol is strong—only for experienced retinoid users. The squalane base helps with tolerability, but expect irritation if you haven\'t built up tolerance. Most people are better served by lower concentrations or prescription retinoids with better delivery systems.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'la-roche-posay-retinol-b3',
    name: 'La Roche-Posay Retinol B3 Serum',
    category: 'Retinoid',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Dark Spots', 'Fine Lines', 'Sensitive Skin'],
    trending: false,
    overview: 'A retinol serum with vitamin B3 (niacinamide) designed for sensitive skin. Gradual release retinol with soothing ingredients.',
    verdict: 'A great option for those who find other retinoids too irritating. The niacinamide helps calm potential inflammation while the retinol works on aging signs. Less potent than tretinoin but more tolerable. Good stepping stone product.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'tazarotene',
    name: 'Tazarotene (Tazorac) Prescription',
    category: 'Retinoid',
    rating: 'gold',
    ratingLabel: 'Gold Standard',
    evidence: 'Extensive',
    concerns: ['Acne', 'Psoriasis', 'Anti-Aging', 'Photodamage'],
    trending: false,
    overview: 'A prescription synthetic retinoid more potent than tretinoin. FDA-approved for acne, psoriasis, and photodamage.',
    verdict: 'The most potent topical retinoid available. Faster results than tretinoin but also more irritating. We reserve this for severe acne, stubborn psoriasis, or patients who\'ve plateaued on tretinoin. Pregnancy category X—strict contraception required.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'bakuchiol-serum',
    name: 'Bakuchiol Serums (Various Brands)',
    category: 'Retinoid',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Anti-Aging', 'Sensitive Skin', 'Pregnancy-Safe Alternative'],
    trending: true,
    overview: 'A plant-derived compound marketed as a "natural retinol alternative." Found in the Psoralea corylifolia plant.',
    verdict: 'The evidence is promising but limited—a few small studies show modest anti-aging effects. Not as potent as true retinoids. May be worth trying if you cannot use retinoids (pregnancy, extreme sensitivity), but don\'t expect equivalent results. More research needed.',
    lastReviewed: '2025-01-24'
  },
  // ADDITIONAL EXFOLIANTS
  {
    id: 'the-ordinary-glycolic',
    name: 'The Ordinary Glycolic Acid 7% Toning Solution',
    category: 'Exfoliant',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Texture', 'Dull Skin', 'Uneven Tone', 'Large Pores'],
    trending: false,
    overview: 'A 7% glycolic acid toner with aloe vera, ginseng, and tasmanian pepperberry for exfoliation and radiance.',
    verdict: 'Excellent value for an effective AHA. The large bottle lasts forever. Start with 2-3 times per week—daily use is too much for most. Don\'t combine with other strong actives. The results for texture and brightness are legitimate.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'cerave-sa-cleanser',
    name: 'CeraVe SA Smoothing Cleanser',
    category: 'Exfoliant',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Acne', 'Rough Skin', 'Keratosis Pilaris', 'Texture'],
    trending: false,
    overview: 'A salicylic acid cleanser with ceramides and niacinamide. Designed for bumpy, rough skin and body acne.',
    verdict: 'Perfect for body acne and keratosis pilaris (those bumps on upper arms). The salicylic acid clears pores while ceramides prevent over-drying. A good daily-use exfoliant that won\'t over-strip. Works better when left on briefly before rinsing.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'cosrx-aha-bha-toner',
    name: 'COSRX AHA/BHA Clarifying Treatment Toner',
    category: 'Exfoliant',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Moderate',
    concerns: ['Blackheads', 'Acne', 'Texture', 'Oily Skin'],
    trending: false,
    overview: 'A gentle daily toner with low concentrations of AHA (glycolic) and BHA (betaine salicylate) plus mineral water.',
    verdict: 'The exfoliating acid concentrations are quite low—this is more of a pH-adjusting toner than a true exfoliant. Fine for daily use but don\'t expect dramatic results. If you want real exfoliation, choose a dedicated AHA or BHA treatment.',
    lastReviewed: '2025-01-12'
  },
  {
    id: 'good-molecules-overnight-exfoliant',
    name: 'Good Molecules Overnight Exfoliating Treatment',
    category: 'Exfoliant',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Texture', 'Fine Lines', 'Dull Skin', 'Uneven Tone'],
    trending: false,
    overview: 'A leave-on treatment with 10% AHA (glycolic, lactic, mandelic) and PHAs for gentler overnight exfoliation.',
    verdict: 'A well-formulated multi-acid treatment at an excellent price. The blend of acids at different molecular sizes provides both surface and deeper exfoliation. Use 2-3 nights per week, not with retinoids. Very effective for smoothing texture.',
    lastReviewed: '2025-01-20'
  },
  {
    id: 'alpha-skincare-intensive',
    name: 'Alpha Skincare Intensive Renewal Serum 14% AHA',
    category: 'Exfoliant',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Strong',
    concerns: ['Anti-Aging', 'Fine Lines', 'Sun Damage', 'Experienced Users'],
    trending: false,
    overview: 'A high-strength 14% glycolic acid serum for intensive exfoliation. Drugstore-available professional-level treatment.',
    verdict: '14% glycolic acid is strong—respect it. This is for experienced exfoliant users only. Can cause significant irritation, peeling, and sun sensitivity if misused. When used correctly (2-3x weekly, with sunscreen), it delivers real results for textured, sun-damaged skin.',
    lastReviewed: '2025-01-16'
  },
  {
    id: 'pixi-glow-tonic',
    name: 'Pixi Glow Tonic 5% Glycolic Acid',
    category: 'Exfoliant',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Strong',
    concerns: ['Dull Skin', 'Texture', 'Brightening', 'Beginners'],
    trending: false,
    overview: 'A cult-favorite 5% glycolic acid toner with aloe vera and ginseng. The original "glow tonic" that started the acid toner trend.',
    verdict: 'A good entry-level AHA toner with a gentler concentration than The Ordinary\'s 7%. The 5% glycolic is effective but less likely to cause irritation. Contains fragrance, which may bother sensitive skin. Solid choice for exfoliant beginners.',
    lastReviewed: '2025-01-10'
  },
  // ADDITIONAL DEVICES
  {
    id: 'led-light-therapy',
    name: 'LED Light Therapy Masks (Various Brands)',
    category: 'Device',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Moderate',
    concerns: ['Acne', 'Anti-Aging', 'Redness', 'Wound Healing'],
    trending: true,
    overview: 'At-home LED devices using red (anti-aging, healing) and blue (acne) light wavelengths. Prices range from $30 to $500+.',
    verdict: 'Professional LED therapy has good evidence; home devices are mixed. The issue is power and dosing—many consumer devices are too weak. Higher-end devices (Omnilux, Dr. Dennis Gross) may provide modest benefits. Cheap Amazon masks are likely ineffective. Manage expectations.',
    lastReviewed: '2025-01-22'
  },
  {
    id: 'nuface-trinity',
    name: 'NuFace Trinity Microcurrent Device',
    category: 'Device',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Anti-Aging', 'Lifting', 'Toning', 'Facial Contouring'],
    trending: false,
    overview: 'A microcurrent device that delivers low-level electrical currents to facial muscles. Marketed for lifting and toning.',
    verdict: 'The immediate "lift" is real but temporary—it\'s essentially a facial workout causing muscle contraction. Long-term benefits are unproven. If you enjoy the ritual and can afford it, it won\'t hurt. But don\'t expect it to replace actual procedures like Botox or fillers.',
    lastReviewed: '2025-01-18'
  },
  {
    id: 'gua-sha-tools',
    name: 'Gua Sha / Jade Roller Tools',
    category: 'Device',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Lymphatic Drainage', 'Puffiness', 'Relaxation', 'Circulation'],
    trending: false,
    overview: 'Traditional Chinese medicine tools made from jade, rose quartz, or other stones. Used for facial massage and claimed lymphatic benefits.',
    verdict: 'The temporary de-puffing effect is real (you\'re manually moving fluid). Any anti-aging claims are unsupported. The material (jade vs. plastic) doesn\'t matter. If you find facial massage relaxing and it helps you apply products, enjoy it. Just don\'t expect structural changes.',
    lastReviewed: '2025-01-14'
  },
  {
    id: 'foreo-luna',
    name: 'Foreo Luna Cleansing Device',
    category: 'Device',
    rating: 'caution',
    ratingLabel: 'Use With Caution',
    evidence: 'Limited',
    concerns: ['Deep Cleansing', 'Gentle Exfoliation', 'Sensitive Skin'],
    trending: false,
    overview: 'A silicone sonic cleansing device with pulsations. Marketed as more hygienic than brush-head cleansers.',
    verdict: 'The silicone is indeed more hygienic than traditional brush heads. But do you need it? Your hands work fine. The sonic vibrations might slightly improve makeup removal but won\'t transform your skin. A luxury, not a necessity. If you enjoy it, fine.',
    lastReviewed: '2025-01-10'
  },
  {
    id: 'high-frequency-wand',
    name: 'High Frequency Wands',
    category: 'Device',
    rating: 'not-recommended',
    ratingLabel: 'Not Recommended',
    evidence: 'None',
    concerns: ['Acne', 'Anti-Aging', 'Blood Circulation'],
    trending: true,
    overview: 'Handheld devices using argon or neon gas electrodes to deliver high-frequency electrical current. Popular on TikTok for acne.',
    verdict: 'Skip these. There\'s no credible scientific evidence supporting home high-frequency devices for acne or anti-aging. Professional high-frequency is a different technology entirely. These can cause burns if misused. The viral videos are not evidence. Save your money.',
    lastReviewed: '2025-01-26'
  },
  {
    id: 'dr-dennis-gross-led',
    name: 'Dr. Dennis Gross DRx SpectraLite FaceWare Pro',
    category: 'Device',
    rating: 'recommended',
    ratingLabel: 'Recommended',
    evidence: 'Moderate',
    concerns: ['Acne', 'Anti-Aging', 'Fine Lines', 'Redness'],
    trending: false,
    overview: 'A professional-grade at-home LED mask with 100 red and 62 blue lights. FDA-cleared for acne and anti-aging. 3-minute treatment time.',
    verdict: 'One of the few home LED devices with enough power to potentially work. The FDA clearance required clinical data showing efficacy. The 3-minute treatment time is realistic. Expensive ($435) but if you want at-home LED, this is a legitimate option.',
    lastReviewed: '2025-01-20'
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
  },
  'Cleanser': {
    icon: '🫧',
    slug: 'cleansers',
    description: 'Gentle cleansing & prep',
    color: '#06b6d4'
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

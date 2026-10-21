export const NOTE_IMAGE_MAP = {
    // Top Notes (13)
    'Bergamot': '/images/bergamot.png',
    'Blood Orange': '/images/bloodorange.png',
    'Pink Pepper': '/images/pinkpepper.png',
    'Pear': '/images/pear.png',
    'Pomegranate': '/images/pomegranate.png',
    'Saffron': '/images/saffron.png',
    'Cardamom': '/images/cardamom.png',
    'Raspberry': '/images/raspberry.png',
    'Lavender': '/images/lavender.png',
    'Fresh Marine': '/images/freshmarine.png',
    'Honey Peach': '/images/honeypeach.png',
    'Coffee': '/images/coffee.png',
    'Sea Salt': '/images/seasalt.png',

    // Heart Notes (13)
    'Rose': '/images/rose.png',
    'Peony': '/images/peony.png',
    'Jasmine': '/images/jasmine.png',
    'Orchid': '/images/orchid.png',
    'Lily': '/images/lily.png',
    'Iris': '/images/iris.png',
    'Vanilla Flower': '/images/vanillaflower.png',
    'Oud': '/images/oud.png',
    'Cinnamon': '/images/cinnamon.png',
    'Mint': '/images/mint.png',
    'Whipped Cream': '/images/whippedcream.png',
    'Lemon': '/images/lemon.png',
    'Honey': '/images/honey.png',

    // Base Notes (14)
    'Amber': '/images/amber.png',
    'Vanilla': '/images/vanilla.png',
    'Musk': '/images/musk.png',
    'Sandalwood': '/images/sandalwood.png',
    'Cedarwood': '/images/cedarwood.png',
    'Patchouli': '/images/patchouli.png',
    'Vetiver': '/images/vetiver.png',
    'Tonka Bean': '/images/tonkabean.png',
    'Incense': '/images/incense.png',
    'Rosemary': '/images/rosemary.png',
    'Fig': '/images/fig.png',
    'Cashmere Wood': '/images/cashmerewood.png',
    'Cherry': '/images/cherry.png',
    'Coconut': '/images/coconut.png'
}

export const getNoteImage = (name) => {
    if (!name) return '/images/vanilla.png'
    if (NOTE_IMAGE_MAP[name]) return NOTE_IMAGE_MAP[name]
    const slug = name.toLowerCase().replace(/\s+/g, '')
    return `/images/${slug}.png`
}

export const products = [
    {
        id: 'productone',
        index: '01',
        name: 'ROUGE MAJESTÉ',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Spiced Floral Oriental',
        price: '$185',
        priceNum: 185,
        image: '/images/productone.png',
        shortDesc: 'A sultry symphony of velvet crimson roses, warm tonka bean, and spiced saffron, wrapped in an opulent satin ribbon.',
        longDesc: 'Inspired by candlelit royal salons and midnight velvet, Rouge Majesté unveils an intoxicating bouquet of crushed Bulgarian roses steeped in golden amber and smoky spice. It leaves an alluring, indelible trail of warm Madagascar vanilla and aged cedar that lingers long after you have departed.',
        notes: {
            top: [
                { name: 'Saffron', image: '/images/saffron.png' },
                { name: 'Blood Orange', image: '/images/bloodorange.png' }
            ],
            heart: [
                { name: 'Rose', image: '/images/rose.png' },
                { name: 'Cinnamon', image: '/images/cinnamon.png' }
            ],
            base: [
                { name: 'Tonka Bean', image: '/images/tonkabean.png' },
                { name: 'Vanilla', image: '/images/vanilla.png' }
            ]
        }
    },
    {
        id: 'producttwo',
        index: '02',
        name: 'MADAME RUBIS',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Faceted Fruity Floral',
        price: '$260',
        priceNum: 260,
        image: '/images/producttwo.png',
        shortDesc: 'An exuberant gem of sparkling pink peony, candied pomegranate, and faceted crystal musk for the radiant spirit.',
        longDesc: 'Madame Rubis sparkles like a freshly cut imperial jewel. Opening with luminous bursts of crisp ruby pomegranate and chilled pink pepper, the heart blossoms into sweet peony and velvety magnolia before drying down into warm cashmere woods.',
        notes: {
            top: [
                { name: 'Pomegranate', image: '/images/pomegranate.png' },
                { name: 'Pink Pepper', image: '/images/pinkpepper.png' }
            ],
            heart: [
                { name: 'Peony', image: '/images/peony.png' },
                { name: 'Rose', image: '/images/rose.png' }
            ],
            base: [
                { name: 'Cashmere Wood', image: '/images/cashmerewood.png' },
                { name: 'Musk', image: '/images/musk.png' }
            ]
        }
    },
    {
        id: 'productthree',
        index: '03',
        name: "SERPENT D'OR",
        subtitle: 'Extrait de Parfum • 100ml',
        family: 'Smoky Amber Oud',
        price: '$340',
        priceNum: 340,
        image: '/images/productthree.png',
        shortDesc: 'A hypnotic, serpentine blend of warm honey resin, precious desert oud, and smoked golden sandalwood.',
        longDesc: "Coiled in gold and mystery, Serpent D'Or is a hypnotic elixir crafted for those who embrace the enigmatic. Rich desert spices intertwine with dark wild honey and ancient oud wood, anchored by sacred incense and roasted labdanum.",
        notes: {
            top: [
                { name: 'Cardamom', image: '/images/cardamom.png' },
                { name: 'Honey Peach', image: '/images/honeypeach.png' }
            ],
            heart: [
                { name: 'Oud', image: '/images/oud.png' },
                { name: 'Honey', image: '/images/honey.png' }
            ],
            base: [
                { name: 'Amber', image: '/images/amber.png' },
                { name: 'Sandalwood', image: '/images/sandalwood.png' }
            ]
        }
    },
    {
        id: 'productfour',
        index: '04',
        name: 'FLEUR DE CRISTAL',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Crystalline Fresh Floral',
        price: '$160',
        priceNum: 160,
        image: '/images/productfour.png',
        shortDesc: 'A delicate floral dream of morning white lilies, dewy pear nectar, and soft cashmere breeze.',
        longDesc: 'Capturing the purest bloom of dawn, Fleur de Cristal is a breath of crystalline elegance. Pristine white lilies unfold amidst drops of crisp French pear and chilled freesia, resting upon a clean bed of white musk and blonde cedar.',
        notes: {
            top: [
                { name: 'Pear', image: '/images/pear.png' },
                { name: 'Bergamot', image: '/images/bergamot.png' }
            ],
            heart: [
                { name: 'Lily', image: '/images/lily.png' },
                { name: 'Jasmine', image: '/images/jasmine.png' }
            ],
            base: [
                { name: 'Cedarwood', image: '/images/cedarwood.png' },
                { name: 'Musk', image: '/images/musk.png' }
            ]
        }
    },
    {
        id: 'productfive',
        index: '05',
        name: 'AMBRE NOIR',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Dark Leather Gourmand',
        price: '$295',
        priceNum: 295,
        image: '/images/productfive.png',
        shortDesc: 'A deeply seductive noir flacon radiating dark roasted tonka, vintage leather, and bourbon vanilla.',
        longDesc: 'Architectural, bold, and unapologetically charismatic. Ambre Noir blends aged bourbon vanilla with smoky leather and dark cacao nibs, underpinned by the brooding warmth of roasted Indonesian patchouli.',
        notes: {
            top: [
                { name: 'Coffee', image: '/images/coffee.png' },
                { name: 'Bergamot', image: '/images/bergamot.png' }
            ],
            heart: [
                { name: 'Vanilla Flower', image: '/images/vanillaflower.png' },
                { name: 'Oud', image: '/images/oud.png' }
            ],
            base: [
                { name: 'Patchouli', image: '/images/patchouli.png' },
                { name: 'Amber', image: '/images/amber.png' }
            ]
        }
    },
    {
        id: 'productsix',
        index: '06',
        name: 'FLAMME CÉLESTE',
        subtitle: 'Extrait de Parfum • 100ml',
        family: 'Sacred Resinous Incense',
        price: '$380',
        priceNum: 380,
        image: '/images/productsix.png',
        shortDesc: 'An ethereal spiral flame capturing golden frankincense, solar amber, and warm desert breeze.',
        longDesc: 'Like an eternal flame ascending toward twilight skies, Flamme Céleste radiates pure warmth. Rare Omani frankincense harmonizes with spicy saffron and radiant solar amber, creating an uplifting yet deeply grounding sanctuary of scent.',
        notes: {
            top: [
                { name: 'Saffron', image: '/images/saffron.png' },
                { name: 'Cardamom', image: '/images/cardamom.png' }
            ],
            heart: [
                { name: 'Cinnamon', image: '/images/cinnamon.png' },
                { name: 'Iris', image: '/images/iris.png' }
            ],
            base: [
                { name: 'Incense', image: '/images/incense.png' },
                { name: 'Sandalwood', image: '/images/sandalwood.png' }
            ]
        }
    },
    {
        id: 'productseven',
        index: '07',
        name: 'CERISE ENVOÛTANTE',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Dark Cherry Liqueur',
        price: '$220',
        priceNum: 220,
        image: '/images/productseven.png',
        shortDesc: 'A decadent, forbidden concoction of wild black cherry, bitter almond liqueur, and dark Turkish rose.',
        longDesc: 'Tempting and irresistible, Cerise Envoûtante plunges into the depths of ripe, dark cherries soaked in roasted almond liquor. The heart unfolds into luscious Turkish rose absolute and plum liqueur, softened by warm Peru balsam.',
        notes: {
            top: [
                { name: 'Raspberry', image: '/images/raspberry.png' },
                { name: 'Pink Pepper', image: '/images/pinkpepper.png' }
            ],
            heart: [
                { name: 'Rose', image: '/images/rose.png' },
                { name: 'Whipped Cream', image: '/images/whippedcream.png' }
            ],
            base: [
                { name: 'Cherry', image: '/images/cherry.png' },
                { name: 'Tonka Bean', image: '/images/tonkabean.png' }
            ]
        }
    },
    {
        id: 'producteight',
        index: '08',
        name: 'NOEUD DE SOIE',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Sweet Velvet Praline',
        price: '$145',
        priceNum: 145,
        image: '/images/producteight.png',
        shortDesc: 'A playful, ribbon-tied confection of glazed praline, wild raspberry coulis, and midnight orchid.',
        longDesc: 'Tied with grace and wrapped in glamour, Noeud de Soie celebrates irresistible indulgence. Sparkling raspberry coulis mingles with velvety vanilla praline and blooming midnight orchid, resting on a pillowy cloud of spun caramel and musk.',
        notes: {
            top: [
                { name: 'Raspberry', image: '/images/raspberry.png' },
                { name: 'Pear', image: '/images/pear.png' }
            ],
            heart: [
                { name: 'Orchid', image: '/images/orchid.png' },
                { name: 'Whipped Cream', image: '/images/whippedcream.png' }
            ],
            base: [
                { name: 'Vanilla', image: '/images/vanilla.png' },
                { name: 'Coconut', image: '/images/coconut.png' }
            ]
        }
    },
    {
        id: 'productnine',
        index: '09',
        name: 'AZUR INFINI',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Aquatic Marine Mineral',
        price: '$190',
        priceNum: 190,
        image: '/images/productnine.png',
        shortDesc: 'A crystalline oceanic reverie of Mediterranean sea spray, blue lotus, and sun-bleached coastal cedar.',
        longDesc: 'Azur Infini transports the wearer to sun-drenched Mediterranean cliffs overlooking boundless cobalt waters. Brisk sea spray and sparkling Italian citrus dissolve into delicate blue lotus and mineral sea moss, grounded by bleached driftwood.',
        notes: {
            top: [
                { name: 'Fresh Marine', image: '/images/freshmarine.png' },
                { name: 'Sea Salt', image: '/images/seasalt.png' }
            ],
            heart: [
                { name: 'Mint', image: '/images/mint.png' },
                { name: 'Lily', image: '/images/lily.png' }
            ],
            base: [
                { name: 'Cashmere Wood', image: '/images/cashmerewood.png' },
                { name: 'Vetiver', image: '/images/vetiver.png' }
            ]
        }
    },
    {
        id: 'productten',
        index: '10',
        name: 'LARME DE ROSE',
        subtitle: 'Extrait de Parfum • 100ml',
        family: 'Precious Nectar Chiffon',
        price: '$310',
        priceNum: 310,
        image: '/images/productten.png',
        shortDesc: 'An exquisite tear of liquid rose gold, dripping with Damascus rose nectar, Florentine iris, and white musk.',
        longDesc: 'A poetic masterpiece embodying romance and refined poise. Larme de Rose suspends precious Damascus rose nectar in warm Florentine iris and velvety heliotrope, culminating in a radiant finish of liquid amber and white musk.',
        notes: {
            top: [
                { name: 'Blood Orange', image: '/images/bloodorange.png' },
                { name: 'Pomegranate', image: '/images/pomegranate.png' }
            ],
            heart: [
                { name: 'Iris', image: '/images/iris.png' },
                { name: 'Peony', image: '/images/peony.png' }
            ],
            base: [
                { name: 'Cherry', image: '/images/cherry.png' },
                { name: 'Rosemary', image: '/images/rosemary.png' }
            ]
        }
    },
    {
        id: 'perfumeone',
        index: '11',
        name: 'FLORAL SPICY',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Golden Warm Amber',
        price: '$95',
        priceNum: 95,
        image: '/images/perfumeone.png',
        shortDesc: 'An exquisite signature blend of sweet orange blossom, pink pepper crystals, and warm golden amber.',
        longDesc: 'A timeless cornerstone of our signature collection. Floral Spicy balances radiant neroli and zesty pink pepper with an intoxicating floral heart, gently settled on a bed of warm Baltic amber and sweet Madagascar vanilla.',
        notes: {
            top: [
                { name: 'Pink Pepper', image: '/images/pinkpepper.png' },
                { name: 'Honey Peach', image: '/images/honeypeach.png' }
            ],
            heart: [
                { name: 'Jasmine', image: '/images/jasmine.png' },
                { name: 'Honey', image: '/images/honey.png' }
            ],
            base: [
                { name: 'Incense', image: '/images/incense.png' },
                { name: 'Coconut', image: '/images/coconut.png' }
            ]
        }
    },
    {
        id: 'perfumetwo',
        index: '12',
        name: 'FRUITY OCEANIC',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Crisp Marine Berry',
        price: '$110',
        priceNum: 110,
        image: '/images/perfumetwo.png',
        shortDesc: 'An invigorating aquatic journey of crushed frosted blackberries, crisp sea breeze, and wild lavender.',
        longDesc: 'Pure atmospheric enchantment. Fruity Oceanic weaves dark, succulent berries through salty oceanic air and calming French lavender, creating a crisp, vibrant, and effortlessly modern signature.',
        notes: {
            top: [
                { name: 'Sea Salt', image: '/images/seasalt.png' },
                { name: 'Fresh Marine', image: '/images/freshmarine.png' }
            ],
            heart: [
                { name: 'Lemon', image: '/images/lemon.png' },
                { name: 'Mint', image: '/images/mint.png' }
            ],
            base: [
                { name: 'Vetiver', image: '/images/vetiver.png' },
                { name: 'Cedarwood', image: '/images/cedarwood.png' }
            ]
        }
    },
    {
        id: 'perfumethree',
        index: '13',
        name: 'WOODY LAVENDER',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Aromatic Earthy Fougère',
        price: '$130',
        priceNum: 130,
        image: '/images/perfumethree.png',
        shortDesc: 'A rebellious yet sophisticated accord of smoky French lavender, black truffle, and earthy vetiver.',
        longDesc: 'Encased in an edgy, studded flacon, Woody Lavender presents an unapologetically bold interpretation of lavender. Infused with dark truffles, rich earthy vetiver, and smoky patchouli for a commanding, unforgettable aura.',
        notes: {
            top: [
                { name: 'Lavender', image: '/images/lavender.png' },
                { name: 'Coffee', image: '/images/coffee.png' }
            ],
            heart: [
                { name: 'Vanilla Flower', image: '/images/vanillaflower.png' },
                { name: 'Lemon', image: '/images/lemon.png' }
            ],
            base: [
                { name: 'Patchouli', image: '/images/patchouli.png' },
                { name: 'Fig', image: '/images/fig.png' }
            ]
        }
    },
    {
        id: 'perfumefour',
        index: '14',
        name: 'CRYSTAL EMERALD',
        subtitle: 'Eau de Parfum • 100ml',
        family: 'Lush Green Mediterranean',
        price: '$125',
        priceNum: 125,
        image: '/images/perfumefour.png',
        shortDesc: 'A rejuvenating elixir of Mediterranean bergamot, lush green fig leaves, and emerald cedar.',
        longDesc: 'Like an imperial green gem illuminated by morning sun, Crystal Emerald captures the revitalizing spirit of lush citrus groves and Mediterranean fig trees, enveloped in crisp cedarwood and sparkling moss.',
        notes: {
            top: [
                { name: 'Bergamot', image: '/images/bergamot.png' },
                { name: 'Lavender', image: '/images/lavender.png' }
            ],
            heart: [
                { name: 'Orchid', image: '/images/orchid.png' },
                { name: 'Lily', image: '/images/lily.png' }
            ],
            base: [
                { name: 'Fig', image: '/images/fig.png' },
                { name: 'Rosemary', image: '/images/rosemary.png' }
            ]
        }
    }
]

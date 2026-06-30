import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';

import User from '../models/User';
import Package from '../models/Package';
import Gallery from '../models/Gallery';
import Lead from '../models/Lead';
import Booking from '../models/Booking';
import Quotation from '../models/Quotation';
import Payment from '../models/Payment';
import Notification from '../models/Notification';
import AuditLog from '../models/AuditLog';

// Load env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/luxury_events';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Package.deleteMany();
    await Gallery.deleteMany();
    await Lead.deleteMany();
    await Booking.deleteMany();
    await Quotation.deleteMany();
    await Payment.deleteMany();
    await Notification.deleteMany();
    await AuditLog.deleteMany();

    console.log('Cleared existing data.');

    // Users
    const admin = await User.create({
      name: 'Julianne Ross',
      email: 'admin@thestudio.com',
      password: 'admin123',
      role: 'admin'
    });

    const client = await User.create({
      name: 'Alexander & Sophia Sterling',
      email: 'client@sterling.com',
      password: 'client123',
      role: 'client'
    });

    // Packages
    const pkg1 = await Package.create({
      name: 'The Signature Gala',
      description: 'Our most sought-after full-service design and production package for corporate and charity galas.',
      category: 'Corporate',
      base_price: 25000,
      features: ['Concept & Design', 'Venue Sourcing', 'Premium Floral', 'A/V & Lighting', 'On-site Management'],
      is_active: true
    });

    const pkg2 = await Package.create({
      name: 'The Estate Wedding',
      description: 'Comprehensive luxury wedding planning for destination and private estate celebrations.',
      category: 'Wedding',
      base_price: 35000,
      features: ['Full Planning', 'Design Curation', 'Guest Management', 'Multi-day Itinerary', 'White-glove Service'],
      is_active: true
    });

    const pkg3 = await Package.create({
      name: 'The Intimate Soirée',
      description: 'Exclusive, highly curated micro-events and dinner parties for discerning guests.',
      category: 'Social',
      base_price: 12000,
      features: ['Venue Curation', 'Tablescape Design', 'Private Chef Coordination', 'Bespoke Stationery'],
      is_active: true
    });

    // Galleries — 10 curated portfolio entries with full rich content
    await Gallery.create({
      title: 'The Metropolitan Gala',
      description: 'A sweeping architectural installation across three floors of the Metropolitan Museum for 400 guests from the global arts world.',
      longDescription: 'Commissioned by a leading arts foundation, this annual gala demanded a design that honoured the museum\'s iconic architecture while pushing the boundaries of experiential design. We constructed white orchid columns fifteen feet tall in the Great Hall, suspended 2,400 hand-blown crystal pendants from the ceiling vaults, and choreographed lighting that shifted in colour temperature throughout the five-hour event to mirror the narrative arc of the evening. A live chamber orchestra performed from a concealed mezzanine, their music rising through the marble floors. The menu, developed in collaboration with a three-Michelin-starred chef, was a twelve-course journey through the history of civilisation — each course paired with wine sourced from the corresponding region and era. Every detail, from the weight of the cutlery to the scent diffused through the air handling system, was deliberate.',
      category: 'Corporate',
      location: 'New York, USA',
      year: 2024,
      guestCount: 400,
      services: ['Concept & Design', 'Floral Architecture', 'Lighting Design', 'Culinary Curation', 'Entertainment Direction', 'On-site Production'],
      images: [
        { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop', public_id: 'met_gala_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2000&auto=format&fit=crop', public_id: 'met_gala_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop', public_id: 'met_gala_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2000&auto=format&fit=crop', public_id: 'met_gala_4', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop', public_id: 'met_gala_5', is_primary: false },
      ],
      testimonial: {
        quote: 'The team transformed the Met into something I had never seen before — not a venue, but a world. Our guests are still talking about it eighteen months later.',
        author: 'Catherine Aldridge',
        role: 'Executive Director, Aldridge Arts Foundation',
      },
      stats: [
        { label: 'Guests', value: '400' },
        { label: 'Crystal Pendants', value: '2,400' },
        { label: 'Floral Stems', value: '18,000' },
        { label: 'Planning Months', value: '9' },
      ],
    });

    await Gallery.create({
      title: 'Lake Como Estate Wedding',
      description: 'A breathtaking three-day wedding celebration at Villa Balbiano on the shores of Lake Como.',
      longDescription: 'Over three days on the private grounds of Villa Balbiano, we wove together a wedding that felt as timeless as the lake itself. The ceremony was held in the estate\'s baroque chapel, its aisle lined with hundreds of white peonies and cascading jasmine. The afternoon reception moved to the lakeside terrace, where long tables set with antique silver and hand-painted porcelain stretched beneath a canopy of wisteria and fairy lights. On the final evening, we hosted a private farewell dinner in the orangerie, followed by a fireworks display launched from a boat on the lake — the reflections doubling every burst of colour in the still water. Every floral arrangement was grown within 60 kilometres of the estate. The couple\'s monogram was woven into the napkins, the candle pillars, and the sugar-work centrepiece of the five-tier wedding cake.',
      category: 'Wedding',
      location: 'Lake Como, Italy',
      year: 2024,
      guestCount: 120,
      services: ['Full Wedding Planning', 'Floral Design', 'Venue Styling', 'Catering Curation', 'Accommodation Management', 'Fireworks Choreography'],
      images: [
        { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop', public_id: 'como_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop', public_id: 'como_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop', public_id: 'como_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=2000&auto=format&fit=crop', public_id: 'como_4', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=2000&auto=format&fit=crop', public_id: 'como_5', is_primary: false },
      ],
      testimonial: {
        quote: 'We handed over our dream and received something beyond it. Every single detail was more beautiful than we had imagined. We felt like guests at our own wedding — completely cared for.',
        author: 'Sophia & James Harrington',
        role: 'Bride & Groom',
      },
      stats: [
        { label: 'Days of Celebration', value: '3' },
        { label: 'Guests', value: '120' },
        { label: 'Floral Stems', value: '12,000' },
        { label: 'Courses at Dinner', value: '9' },
      ],
    });

    await Gallery.create({
      title: 'Rajasthan Palace Soirée',
      description: 'An intimate dinner for 60 guests within the candlelit courtyard of a 17th-century Rajasthani palace.',
      longDescription: 'The brief was simple: make 60 people feel like royalty for one night. We took over the inner courtyard of a privately owned 17th-century haveli in Jodhpur and transformed it over four days of preparation. Hand-embroidered silk tablecloths in indigo and gold were commissioned from artisans in Jaisalmer. Brass lanterns — over 400 of them — were arranged across every surface, ledge, and niche. A rangoli of 80,000 marigold petals covered the courtyard floor, paths cut through it to the tables like rivers of gold. The kitchen prepared a fifteen-course progressive dinner drawing on Mughal court recipes, each served on vintage silverware sourced from heritage estates across Rajasthan. A classical sitar and tabla duo played through the meal; at midnight, Kathak dancers performed in the fountain courtyard as guests sipped spiced chai under the stars.',
      category: 'Social',
      location: 'Jodhpur, India',
      year: 2023,
      guestCount: 60,
      services: ['Venue Transformation', 'Artisan Procurement', 'Culinary Direction', 'Cultural Programming', 'Floral & Rangoli Design'],
      images: [
        { url: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=2000&auto=format&fit=crop', public_id: 'raj_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop', public_id: 'raj_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1585637071849-8f0e1fcf2c8d?q=80&w=2000&auto=format&fit=crop', public_id: 'raj_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=2000&auto=format&fit=crop', public_id: 'raj_4', is_primary: false },
      ],
      testimonial: {
        quote: 'I have attended events on six continents. This was the most transporting evening of my life. The detail, the warmth, the artistry — I was genuinely moved to tears.',
        author: 'Lord William Ashford',
        role: 'Guest of Honour',
      },
      stats: [
        { label: 'Guests', value: '60' },
        { label: 'Marigold Petals', value: '80,000' },
        { label: 'Brass Lanterns', value: '400+' },
        { label: 'Courses', value: '15' },
      ],
    });

    await Gallery.create({
      title: 'Maldives Overwater Wedding',
      description: 'A sunrise ceremony on a private overwater platform at Soneva Jani, followed by a floating reception on the Indian Ocean.',
      longDescription: 'When our clients said they wanted to be married at sunrise with only the ocean around them, we knew we needed to build the venue ourselves. Over two weeks, our team constructed a bespoke overwater ceremony platform 200 metres from shore, accessible by traditional dhoni. White and aquamarine blooms were flown in from Holland and hand-arranged the night before. The couple were rowed out alone at 5:30am; guests arrived by fleet of six dhonis as the sun crested the horizon. The breakfast reception followed on the resort\'s private sandbank — barefoot, white linen, freshly caught fish grilled over coconut husks, tropical flowers floating in lagoon-blue water vessels. The evening saw a candlelit dinner under a ceiling of 3,000 suspended glass orbs over the primary overwater villa, each orb filled with a single stem of coral-white orchid.',
      category: 'Wedding',
      location: 'Noonu Atoll, Maldives',
      year: 2024,
      guestCount: 40,
      services: ['Platform Construction', 'Floral Importation & Design', 'Marine Logistics', 'Culinary Experience', 'Photography Direction', 'Private Accommodation Buyout'],
      images: [
        { url: 'https://images.unsplash.com/photo-1538681105587-85640961bf8b?q=80&w=2000&auto=format&fit=crop', public_id: 'maldives_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2000&auto=format&fit=crop', public_id: 'maldives_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop', public_id: 'maldives_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2000&auto=format&fit=crop', public_id: 'maldives_4', is_primary: false },
      ],
      testimonial: {
        quote: 'There are no words. We floated to our own wedding as the sun came up over the Indian Ocean. It did not feel real. It felt better than real.',
        author: 'Priya & Arjun Mehta',
        role: 'Bride & Groom',
      },
      stats: [
        { label: 'Guests', value: '40' },
        { label: 'Glass Orbs', value: '3,000' },
        { label: 'Orchid Stems', value: '4,200' },
        { label: 'Days on Location', value: '5' },
      ],
    });

    await Gallery.create({
      title: 'Versailles Masquerade Ball',
      description: 'A grand costume ball for 250 guests in the Orangerie of a private château outside Paris.',
      longDescription: 'Inspired by the court entertainments of Louis XIV, this annual masquerade ball for a private members\' club required the total theatrical transformation of a 1,200-square-metre orangerie. We sourced antique French furniture from Paris auction houses, installed 12 custom-fabricated baroque mirror panels, and commissioned an atelier in Lyon to produce 250 individual masquerade masks — no two alike — delivered in silk-lined boxes as the invitation. The evening opened with a procession led by two stilt walkers in gold-leaf baroque costumes. A six-course dinner was served in two sittings, with entertainment from a string quartet, a baroque soprano, and a contortionist troupe between courses. At midnight, a hidden door in the panelling opened to reveal a separate jazz room where the party continued until 4am.',
      category: 'Social',
      location: 'Île-de-France, France',
      year: 2023,
      guestCount: 250,
      services: ['Set Design & Fabrication', 'Costume & Mask Atelier', 'Entertainment Curation', 'Culinary Direction', 'Theatrical Lighting', 'Guest Experience Design'],
      images: [
        { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop', public_id: 'versailles_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop', public_id: 'versailles_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=2000&auto=format&fit=crop', public_id: 'versailles_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop', public_id: 'versailles_4', is_primary: false },
      ],
      testimonial: {
        quote: 'I have hosted parties for thirty years. This was the first time I felt like a guest at my own event — because someone else had thought of absolutely everything.',
        author: 'Countess Élise de Montfort',
        role: 'Host',
      },
      stats: [
        { label: 'Guests', value: '250' },
        { label: 'Bespoke Masks', value: '250' },
        { label: 'Mirror Panels', value: '12' },
        { label: 'Hours of Entertainment', value: '8' },
      ],
    });

    await Gallery.create({
      title: 'Tokyo Brand Launch',
      description: 'A product launch for a global luxury fashion house in the Mori Tower, Roppongi Hills — where Japanese minimalism met haute couture staging.',
      longDescription: 'The brief from our client\'s creative director was a single word: silence. The launch of their new collection was to feel like stepping inside a poem. We worked with a Tokyo-based architect to design 40 suspended washi paper panels that diffused light in shifting patterns throughout the 800-square-metre event space in Mori Tower. The runway was white quartz; the lighting, programmable to 4,000 colours, changed with each look. A Michelin three-star chef prepared an omakase for 180 press, buyers, and brand ambassadors — each course presented in custom ceramics made by a Kyoto artisan. The event ran in complete silence until the final look, at which point a single pianist began Satie\'s Gymnopédie. Press described it as the most emotionally coherent brand experience of the season.',
      category: 'Corporate',
      location: 'Tokyo, Japan',
      year: 2024,
      guestCount: 180,
      services: ['Spatial Design', 'Runway Production', 'Lighting Architecture', 'Culinary Experience', 'Press & Buyer Relations', 'Artisan Collaboration'],
      images: [
        { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop', public_id: 'tokyo_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2000&auto=format&fit=crop', public_id: 'tokyo_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop', public_id: 'tokyo_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop', public_id: 'tokyo_4', is_primary: false },
      ],
      testimonial: {
        quote: 'They understood something about our brand that we had never articulated. The space they created said everything the collection was trying to say, before a single model walked.',
        author: 'Hiroshi Tanaka',
        role: 'Creative Director, Maison Tanaka',
      },
      stats: [
        { label: 'Press & Buyers', value: '180' },
        { label: 'Washi Panels', value: '40' },
        { label: 'Lighting Colours', value: '4,000' },
        { label: 'Omakase Courses', value: '14' },
      ],
    });

    await Gallery.create({
      title: 'Tuscany Vineyard Harvest Wedding',
      description: 'An autumn harvest celebration at a private estate in Montalcino — stone chapel vows, a long-table dinner among the vines, golden candlelight and Brunello.',
      longDescription: 'The couple had one request: that their wedding feel like it had always belonged to the land. We spent three days dressing the estate before a single guest arrived. Hundreds of hand-poured beeswax tapers were placed along the ancient stone walls. Wild herbs — rosemary, sage, lavender — were gathered from the surrounding hillsides and woven into garlands that ran the full length of four thirty-metre dining tables. The menu was built entirely around the estate\'s harvest: handmade pici pasta, slow-roasted Chianina beef, truffle from the nearby woods, and six vintages of the estate\'s own Brunello di Montalcino. The wedding cake was a croquembouche scented with honey from the estate\'s hives. After dinner, the guests danced in the barrel cellar by candlelight as a Florentine jazz trio played until midnight. Rain came at 11pm. Nobody went inside.',
      category: 'Wedding',
      location: 'Montalcino, Tuscany, Italy',
      year: 2023,
      guestCount: 85,
      services: ['Full Planning', 'Venue Dressing', 'Culinary Direction', 'Floral & Botanical Design', 'Music Curation', 'Wine Selection'],
      images: [
        { url: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=2000&auto=format&fit=crop', public_id: 'tuscany_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2000&auto=format&fit=crop', public_id: 'tuscany_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop', public_id: 'tuscany_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop', public_id: 'tuscany_4', is_primary: false },
      ],
      testimonial: {
        quote: 'It rained. We didn\'t care. We didn\'t even notice for a while. That is what it means to create a perfect atmosphere — nothing external can break it.',
        author: 'Marco & Elena Ferri',
        role: 'Bride & Groom',
      },
      stats: [
        { label: 'Guests', value: '85' },
        { label: 'Metres of Table', value: '120' },
        { label: 'Beeswax Candles', value: '600+' },
        { label: 'Wine Vintages Served', value: '6' },
      ],
    });

    await Gallery.create({
      title: 'Dubai Rooftop New Year',
      description: 'A rooftop countdown gala for 350 guests above the Arabian Gulf — floating florals, skyline mapping and a private fireworks finale.',
      longDescription: 'With a budget that matched their ambition, this private client commissioned the most technically complex event we have produced. The rooftop of a private residence tower in Dubai Marina was transformed over six days into an open-air celebration space with three distinct zones: a cocktail garden of suspended floral spheres above reflective water tiles, a dining pavilion with hand-stitched silk canopies and live flame centrepieces, and a viewing platform with telescopes for stargazing over the Gulf. A custom LED mapping system projected the skyline of 24 cities — one for each hour of the global new year — onto an architectural scrim. At midnight, a private fireworks display licensed at government level launched from two barges offshore. The countdown was performed by a live choir of 24 voices singing a bespoke composition written for the occasion.',
      category: 'Corporate',
      location: 'Dubai, UAE',
      year: 2023,
      guestCount: 350,
      services: ['Spatial Architecture', 'Floral Installation', 'LED Mapping & AV', 'Fireworks Licensing', 'Culinary Experience', 'Entertainment Commission'],
      images: [
        { url: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?q=80&w=2000&auto=format&fit=crop', public_id: 'dubai_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop', public_id: 'dubai_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2000&auto=format&fit=crop', public_id: 'dubai_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2000&auto=format&fit=crop', public_id: 'dubai_4', is_primary: false },
      ],
      testimonial: {
        quote: 'Every year I try to do something that surprises my guests. For the first time in fifteen years, I was the one who was surprised. It was beyond anything I had envisioned.',
        author: 'Sheikh Faisal Al Maktoum',
        role: 'Host',
      },
      stats: [
        { label: 'Guests', value: '350' },
        { label: 'Cities Mapped', value: '24' },
        { label: 'Choir Voices', value: '24' },
        { label: 'Days of Setup', value: '6' },
      ],
    });

    await Gallery.create({
      title: 'Scottish Highland Elopement',
      description: 'An intimate elopement for two on the misty shores of Loch Lomond — proof that the smallest events carry the deepest emotion.',
      longDescription: 'They wanted no guests, no speeches, no photographer at the altar. Just the two of them, a loch, and a moment they would carry forever. We arranged everything else. A remote boathouse on the southern shore of Loch Lomond was dressed with foraged mosses, heather, and wild thistle. A local stone mason carved their initials into a river stone as their only keepsake. A single piper played as they walked the short path to the water\'s edge. The ceremony was performed by a humanist celebrant who had corresponded with the couple for six months to write something that was entirely, specifically theirs. Afterwards, a private chef prepared a four-course meal inside the boathouse by firelight, with wine chosen to match each course of the menu they had designed together in the months prior. They stayed for three nights in a private castle cottage on the estate.',
      category: 'Wedding',
      location: 'Loch Lomond, Scotland',
      year: 2024,
      guestCount: 2,
      services: ['Intimate Planning', 'Venue Sourcing', 'Botanical Styling', 'Bespoke Ceremony Writing', 'Private Chef', 'Accommodation Curation'],
      images: [
        { url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=2000&auto=format&fit=crop', public_id: 'highland_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=2000&auto=format&fit=crop', public_id: 'highland_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000&auto=format&fit=crop', public_id: 'highland_3', is_primary: false },
      ],
      testimonial: {
        quote: 'We told them we wanted to disappear. They made the world disappear and left only what mattered. We will never forget a single detail of that day.',
        author: 'Claire & Thomas',
        role: 'Bride & Groom',
      },
      stats: [
        { label: 'Guests', value: '2' },
        { label: 'Nights on Estate', value: '3' },
        { label: 'Months of Planning', value: '6' },
        { label: 'Foraged Species Used', value: '12' },
      ],
    });

    await Gallery.create({
      title: 'Mumbai Bollywood Gala',
      description: 'A fundraiser gala celebrating 100 years of Indian cinema at the Jio World Convention Centre — couture tablescapes, film-era set pieces, and 500 guests from art and philanthropy.',
      longDescription: 'To mark a century of Indian cinema, we were commissioned to produce a fundraiser gala that was itself a cinematic experience. The Jio World Convention Centre\'s 4,000-square-metre Grand Ballroom was divided into five zones, each representing a defining era of Bollywood — the black-and-white classical period, the colourful masala era, the new wave, the NRI diaspora films, and contemporary global Indian cinema. Each zone had its own design language, food offering, and live entertainment. Guests moved through the eras during cocktail hour before converging for a central gala dinner under a 40-metre chandelier of 6,000 marigolds. The evening raised ₹18 crore for a film preservation trust. Performers included a classical kathak troupe, a playback singer from the 1970s making a rare live appearance, and a contemporary choreographer whose piece closed the night.',
      category: 'Social',
      location: 'Mumbai, India',
      year: 2023,
      guestCount: 500,
      services: ['Concept & Narrative Design', 'Set Construction', 'Entertainment Programming', 'Culinary Direction', 'Fundraising Integration', 'Guest Experience'],
      images: [
        { url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=2000&auto=format&fit=crop', public_id: 'mumbai_1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop', public_id: 'mumbai_2', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop', public_id: 'mumbai_3', is_primary: false },
        { url: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=2000&auto=format&fit=crop', public_id: 'mumbai_4', is_primary: false },
      ],
      testimonial: {
        quote: 'Walking into that room was like walking into a hundred years of memory. You could feel the love for cinema in every corner. It was the most moving fundraiser I have attended.',
        author: 'Asha Parekh',
        role: 'Patron of the Arts & Guest of Honour',
      },
      stats: [
        { label: 'Guests', value: '500' },
        { label: 'Cinema Eras', value: '5' },
        { label: 'Marigolds', value: '6,000' },
        { label: 'Raised for Trust', value: '₹18 Cr' },
      ],
    });

    // Leads
    const lead1 = await Lead.create({
      client_name: 'Isabella Vance',
      email: 'isabella@example.com',
      phone: '+1-555-0100',
      event_date: new Date('2025-06-20'),
      guest_count: 150,
      budget: '50000+',
      message: 'Looking for a chateau wedding in France.',
      status: 'new'
    });

    const lead2 = await Lead.create({
      client_name: 'Alexander Sterling',
      email: 'client@sterling.com',
      phone: '+1-555-0200',
      event_date: new Date('2024-12-10'),
      guest_count: 300,
      budget: '100000+',
      message: 'End of year corporate celebration.',
      status: 'converted'
    });

    const quote = await Quotation.create({
      lead_id: lead2._id,
      package_id: pkg1._id,
      status: 'accepted',
      total_amount: 35000,
      validUntil: new Date('2024-11-01'),
      pricingSnapshot: {
        venueCost: 15000,
        decorationCost: 10000,
        photographyCost: 5000,
        videographyCost: 0,
        entertainmentCost: 5000,
        cateringCost: 0,
        transportationCost: 0,
        additionalServicesCost: 0,
        discountAmount: 0,
        taxPercentage: 0,
        taxAmount: 0,
        grandTotal: 35000
      },
      versionNumber: 1,
      quotationNumber: 'QT-STERLING-001'
    });

    // Booking
    const booking1 = await Booking.create({
      client_id: client._id,
      package_id: pkg1._id,
      quotation_id: quote._id,
      event_date: new Date('2024-12-10'),
      venue: 'The Plaza Hotel',
      status: 'in_progress',
      payment_status: 'partial'
    });

    // Payment
    await Payment.create({
      bookingId: booking1._id,
      clientId: client._id,
      amount: 15000,
      currency: 'USD',
      status: 'paid',
      paymentMethod: 'bank_transfer',
      transactionId: 'TXN-987654321'
    });

    // Notifications
    await Notification.create({
      recipient: admin._id,
      title: 'New Lead',
      message: 'Isabella Vance has submitted an inquiry.',
      type: 'info',
      isRead: false
    });

    await Notification.create({
      recipient: client._id,
      title: 'Payment Received',
      message: 'Your deposit of $15,000 has been successfully processed.',
      type: 'success',
      isRead: false
    });

    // Audit Logs
    await AuditLog.create({
      performedBy: admin._id as any,
      action: 'UPDATE_BOOKING',
      entityType: 'Booking',
      entityId: booking1._id as any,
      newValue: { status: 'in_progress' }
    });

    console.log('Database successfully seeded with luxury event demo data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

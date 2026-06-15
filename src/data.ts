export type OrderStatus = 'Pending'|'Processing'|'Shipped'|'Delivered'|'Cancelled'|'Refunded'
export type ProductCategory = 'Sunflower Oil'|'Specialty Oil'|'Traditional Oil'
export type UserRole = 'Customer'|'Distributor'|'Wholesaler'
export type StockStatus = 'In Stock'|'Low Stock'|'Out of Stock'

export interface Order {
  id:string; customer:string; email:string; phone:string; city:string
  date:string; items:string[]; total:number; status:OrderStatus
  paymentMethod:string; deliveryAddress:string
}

export interface Product {
  id:number; name:string; brand:string; category:ProductCategory
  price1L:number; price5L:number; price15L:number
  stock1L:number; stock5L:number; stock15L:number
  sold:number; rating:number; reviews:number
  status:StockStatus; emoji:string; description:string
}

export interface Customer {
  id:number; name:string; email:string; phone:string; city:string
  role:UserRole; orders:number; totalSpent:number; joinDate:string; status:'Active'|'Inactive'
  avatar:string
}

export interface Review {
  id:number; customer:string; product:string; rating:number
  comment:string; date:string; status:'Published'|'Pending'|'Rejected'
}

export interface Coupon {
  id:number; code:string; type:'Percentage'|'Flat'; value:number
  minOrder:number; usedCount:number; maxUses:number
  expiry:string; status:'Active'|'Expired'|'Disabled'
}

export interface Notification {
  id:number; type:'order'|'stock'|'review'|'user'|'system'
  message:string; time:string; read:boolean
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const orders: Order[] = [
  {id:'#MML10234',customer:'Priya Sharma',email:'priya@gmail.com',phone:'+91-9876543210',city:'Chennai',date:'Apr 28, 2025',items:['MML Gold 5L × 2','Sunnova 1L × 1'],total:1865,status:'Delivered',paymentMethod:'UPI',deliveryAddress:'12, Anna Nagar, Chennai - 600040'},
  {id:'#MML10233',customer:'Rajan Kumar',email:'rajan@gmail.com',phone:'+91-9876543211',city:'Coimbatore',date:'Apr 27, 2025',items:['Sunnova 5L × 1'],total:780,status:'Shipped',paymentMethod:'Card',deliveryAddress:'45, RS Puram, Coimbatore - 641002'},
  {id:'#MML10232',customer:'Meena Devi',email:'meena@gmail.com',phone:'+91-9876543212',city:'Madurai',date:'Apr 27, 2025',items:['Karthigai Jothi 1L × 3'],total:360,status:'Processing',paymentMethod:'COD',deliveryAddress:'8, KK Nagar, Madurai - 625020'},
  {id:'#MML10231',customer:'Anand Krishnan',email:'anand@gmail.com',phone:'+91-9876543213',city:'Trichy',date:'Apr 26, 2025',items:['MML Gold 15L × 1','Groundnut 1L × 2'],total:2840,status:'Pending',paymentMethod:'Net Banking',deliveryAddress:'23, Thillai Nagar, Trichy - 620018'},
  {id:'#MML10230',customer:'Saritha Nair',email:'saritha@gmail.com',phone:'+91-9876543214',city:'Salem',date:'Apr 26, 2025',items:['MML Gold Refined 5L × 2'],total:1600,status:'Delivered',paymentMethod:'UPI',deliveryAddress:'67, Fairlands, Salem - 636016'},
  {id:'#MML10229',customer:'Vijay Murugan',email:'vijay@gmail.com',phone:'+91-9876543215',city:'Tirunelveli',date:'Apr 25, 2025',items:['Sunnova 1L × 4','Deepam 1L × 2'],total:900,status:'Cancelled',paymentMethod:'UPI',deliveryAddress:'34, Palayamkottai, Tirunelveli - 627002'},
  {id:'#MML10228',customer:'Kavitha Raj',email:'kavitha@gmail.com',phone:'+91-9876543216',city:'Erode',date:'Apr 25, 2025',items:['MML Gold 5L × 3'],total:2550,status:'Delivered',paymentMethod:'Card',deliveryAddress:'89, Periyar Nagar, Erode - 638001'},
  {id:'#MML10227',customer:'Sathish Kumar',email:'sathish@gmail.com',phone:'+91-9876543217',city:'Vellore',date:'Apr 24, 2025',items:['Rice Bran 5L × 1','MML Gold 1L × 2'],total:1250,status:'Shipped',paymentMethod:'COD',deliveryAddress:'12, Gandhi Nagar, Vellore - 632004'},
  {id:'#MML10226',customer:'Divya Priya',email:'divya@gmail.com',phone:'+91-9876543218',city:'Puducherry',date:'Apr 24, 2025',items:['Sunnova 15L × 1'],total:2200,status:'Delivered',paymentMethod:'UPI',deliveryAddress:'56, White Town, Puducherry - 605001'},
  {id:'#MML10225',customer:'Bala Murugan',email:'bala@gmail.com',phone:'+91-9876543219',city:'Thanjavur',date:'Apr 23, 2025',items:['Karthigai Jothi 5L × 2','MML Gold 1L × 1'],total:1280,status:'Refunded',paymentMethod:'Card',deliveryAddress:'23, Medical College Rd, Thanjavur - 613004'},
  {id:'#MML10224',customer:'Lalitha Sundaram',email:'lalitha@gmail.com',phone:'+91-9876543220',city:'Tiruppur',date:'Apr 23, 2025',items:['MML Gold 5L × 1','Sunnova 5L × 1'],total:1630,status:'Delivered',paymentMethod:'UPI',deliveryAddress:'44, Avinashi Rd, Tiruppur - 641603'},
  {id:'#MML10223',customer:'Prakash Vel',email:'prakash@gmail.com',phone:'+91-9876543221',city:'Nagercoil',date:'Apr 22, 2025',items:['Groundnut 5L × 2'],total:2100,status:'Processing',paymentMethod:'Net Banking',deliveryAddress:'7, Scott Christian College Rd, Nagercoil - 629003'},
]

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
export const products: Product[] = [
  {id:1,name:'MML Gold Sunflower Oil',brand:'MML Gold',category:'Sunflower Oil',price1L:180,price5L:850,price15L:2400,stock1L:450,stock5L:120,stock15L:35,sold:3240,rating:4.8,reviews:1240,status:'In Stock',emoji:'🌻',description:'Premium refined sunflower oil for daily cooking'},
  {id:2,name:'Sunnova Premium Refined Sunflower Oil',brand:'Sunnova',category:'Sunflower Oil',price1L:165,price5L:780,price15L:2200,stock1L:380,stock5L:95,stock15L:20,sold:2180,rating:4.6,reviews:890,status:'In Stock',emoji:'☀️',description:'Heart-friendly oil with low fat absorption'},
  {id:3,name:'MML Gold Refined Sunflower Oil',brand:'MML Gold',category:'Sunflower Oil',price1L:170,price5L:800,price15L:2300,stock1L:12,stock5L:8,stock15L:3,sold:1560,rating:4.7,reviews:760,status:'Low Stock',emoji:'✨',description:'Superior quality for everyday Indian cooking'},
  {id:4,name:'Karthigai Jothi Deepam Oil',brand:'Karthigai Jothi',category:'Traditional Oil',price1L:120,price5L:550,price15L:1500,stock1L:680,stock5L:200,stock15L:80,sold:4200,rating:4.9,reviews:2100,status:'In Stock',emoji:'🪔',description:'Sacred oil for lamps and rituals'},
  {id:5,name:'MML Gold Cold Press Groundnut Oil',brand:'MML Gold',category:'Specialty Oil',price1L:220,price5L:1050,price15L:3000,stock1L:0,stock5L:0,stock15L:0,sold:890,rating:4.5,reviews:430,status:'Out of Stock',emoji:'🥜',description:'Traditional cold-pressed groundnut oil'},
  {id:6,name:'Sunnova Refined Rice Bran Oil',brand:'Sunnova',category:'Specialty Oil',price1L:190,price5L:900,price15L:2600,stock1L:230,stock5L:60,stock15L:15,sold:670,rating:4.4,reviews:380,status:'In Stock',emoji:'🍚',description:'Light oil with high smoke point'},
]

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export const customers: Customer[] = [
  {id:1,name:'Priya Sharma',email:'priya@gmail.com',phone:'+91-9876543210',city:'Chennai',role:'Customer',orders:8,totalSpent:12400,joinDate:'Jan 15, 2024',status:'Active',avatar:'PS'},
  {id:2,name:'Rajan Kumar',email:'rajan@gmail.com',phone:'+91-9876543211',city:'Coimbatore',role:'Distributor',orders:45,totalSpent:187500,joinDate:'Mar 8, 2023',status:'Active',avatar:'RK'},
  {id:3,name:'Meena Devi',email:'meena@gmail.com',phone:'+91-9876543212',city:'Madurai',role:'Customer',orders:3,totalSpent:2800,joinDate:'Feb 20, 2025',status:'Active',avatar:'MD'},
  {id:4,name:'Anand Krishnan',email:'anand@gmail.com',phone:'+91-9876543213',city:'Trichy',role:'Wholesaler',orders:22,totalSpent:98600,joinDate:'Jun 12, 2023',status:'Active',avatar:'AK'},
  {id:5,name:'Saritha Nair',email:'saritha@gmail.com',phone:'+91-9876543214',city:'Salem',role:'Customer',orders:11,totalSpent:18900,joinDate:'Sep 5, 2023',status:'Active',avatar:'SN'},
  {id:6,name:'Vijay Murugan',email:'vijay@gmail.com',phone:'+91-9876543215',city:'Tirunelveli',role:'Customer',orders:5,totalSpent:4500,joinDate:'Nov 30, 2023',status:'Inactive',avatar:'VM'},
  {id:7,name:'Kavitha Raj',email:'kavitha@gmail.com',phone:'+91-9876543216',city:'Erode',role:'Distributor',orders:38,totalSpent:145000,joinDate:'Apr 2, 2023',status:'Active',avatar:'KR'},
  {id:8,name:'Sathish Kumar',email:'sathish@gmail.com',phone:'+91-9876543217',city:'Vellore',role:'Customer',orders:6,totalSpent:7800,joinDate:'Dec 18, 2023',status:'Active',avatar:'SK'},
]

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
export const reviews: Review[] = [
  {id:1,customer:'Priya Sharma',product:'MML Gold Sunflower Oil',rating:5,comment:'Best sunflower oil I have ever used. Light, healthy, and my curries taste amazing!',date:'Apr 26, 2025',status:'Published'},
  {id:2,customer:'Rajan Kumar',product:'Sunnova Premium Oil',rating:5,comment:'Switched to Sunnova last year. My doctor noticed my cholesterol improved. Great product!',date:'Apr 25, 2025',status:'Published'},
  {id:3,customer:'Meena Devi',product:'Karthigai Jothi Deepam Oil',rating:5,comment:'Burns so cleanly and lasts long. Perfect for our daily puja rituals.',date:'Apr 24, 2025',status:'Pending'},
  {id:4,customer:'Anand Krishnan',product:'MML Gold Sunflower Oil',rating:4,comment:'Good quality product. Bulk orders are well packed and delivered on time.',date:'Apr 23, 2025',status:'Published'},
  {id:5,customer:'Saritha Nair',product:'MML Gold Refined Oil',rating:5,comment:'As a nutritionist I recommend this. The Vitamin E content is excellent.',date:'Apr 22, 2025',status:'Published'},
  {id:6,customer:'Vijay Murugan',product:'Sunnova Premium Oil',rating:2,comment:'Package was damaged on arrival. Quality seems okay but disappointed with delivery.',date:'Apr 21, 2025',status:'Pending'},
  {id:7,customer:'Kavitha Raj',product:'MML Gold Sunflower Oil',rating:5,comment:'Been using MML products for 3 years. Consistent quality every time!',date:'Apr 20, 2025',status:'Published'},
  {id:8,customer:'Sathish Kumar',product:'Sunnova Rice Bran Oil',rating:4,comment:'High smoke point is great for deep frying. Will definitely buy again.',date:'Apr 19, 2025',status:'Rejected'},
]

// ─── COUPONS ──────────────────────────────────────────────────────────────────
export const coupons: Coupon[] = [
  {id:1,code:'MMLWELCOME10',type:'Percentage',value:10,minOrder:500,usedCount:342,maxUses:1000,expiry:'May 31, 2025',status:'Active'},
  {id:2,code:'BULK50',type:'Flat',value:50,minOrder:999,usedCount:780,maxUses:500,expiry:'Apr 30, 2025',status:'Expired'},
  {id:3,code:'HEALTH20',type:'Percentage',value:20,minOrder:1500,usedCount:156,maxUses:300,expiry:'Jun 15, 2025',status:'Active'},
  {id:4,code:'FESTIVAL100',type:'Flat',value:100,minOrder:2000,usedCount:89,maxUses:200,expiry:'Jun 30, 2025',status:'Active'},
  {id:5,code:'NEWUSER15',type:'Percentage',value:15,minOrder:300,usedCount:445,maxUses:500,expiry:'Dec 31, 2025',status:'Active'},
  {id:6,code:'DEEPAM30',type:'Flat',value:30,minOrder:500,usedCount:200,maxUses:200,expiry:'Mar 31, 2025',status:'Expired'},
]

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notifications: Notification[] = [
  {id:1,type:'order',message:'New order #MML10234 received from Priya Sharma – ₹1,865',time:'2 min ago',read:false},
  {id:2,type:'stock',message:'MML Gold Refined Oil (1L) is running low – only 12 units left',time:'15 min ago',read:false},
  {id:3,type:'review',message:'New 2-star review pending approval from Vijay Murugan',time:'1 hr ago',read:false},
  {id:4,type:'order',message:'Order #MML10232 status updated to Processing',time:'2 hr ago',read:true},
  {id:5,type:'stock',message:'MML Gold Cold Press Groundnut Oil is now Out of Stock',time:'3 hr ago',read:true},
  {id:6,type:'user',message:'New distributor Kavitha Raj registered from Erode',time:'5 hr ago',read:true},
  {id:7,type:'system',message:'Daily sales report generated – ₹24,680 total revenue today',time:'6 hr ago',read:true},
  {id:8,type:'order',message:'Order #MML10229 was cancelled by Vijay Murugan',time:'8 hr ago',read:true},
]

// ─── ANALYTICS DATA ───────────────────────────────────────────────────────────
export const revenueChart = [
  {month:'Oct',revenue:84200,orders:210,target:80000},
  {month:'Nov',revenue:91500,orders:228,target:90000},
  {month:'Dec',revenue:118000,orders:295,target:110000},
  {month:'Jan',revenue:76300,orders:190,target:85000},
  {month:'Feb',revenue:89400,orders:223,target:90000},
  {month:'Mar',revenue:104600,orders:261,target:100000},
  {month:'Apr',revenue:124800,orders:312,target:120000},
]

export const categoryRevenue = [
  {name:'Sunflower Oil',value:58,color:'#d946ef'},
  {name:'Traditional Oil',value:24,color:'#f59e0b'},
  {name:'Specialty Oil',value:18,color:'#06b6d4'},
]

export const topProducts = [
  {name:'Karthigai Jothi Deepam Oil',sold:4200,revenue:504000,trend:'+12%'},
  {name:'MML Gold Sunflower Oil',sold:3240,revenue:583200,trend:'+8%'},
  {name:'Sunnova Premium Oil',sold:2180,revenue:359700,trend:'+5%'},
  {name:'MML Gold Refined Oil',sold:1560,revenue:265200,trend:'-2%'},
  {name:'Cold Press Groundnut Oil',sold:890,revenue:195800,trend:'+18%'},
]

export const cityRevenue = [
  {city:'Chennai',revenue:284000,orders:142},
  {city:'Coimbatore',revenue:198000,orders:99},
  {city:'Madurai',revenue:156000,orders:78},
  {city:'Trichy',revenue:124000,orders:62},
  {city:'Salem',revenue:98000,orders:49},
  {city:'Erode',revenue:86000,orders:43},
  {city:'Tiruppur',revenue:74000,orders:37},
]

export const weeklyOrders = [
  {day:'Mon',orders:38,revenue:42000},
  {day:'Tue',orders:45,revenue:51000},
  {day:'Wed',orders:52,revenue:59000},
  {day:'Thu',orders:41,revenue:46000},
  {day:'Fri',orders:63,revenue:71000},
  {day:'Sat',orders:78,revenue:88000},
  {day:'Sun',orders:35,revenue:39000},
]

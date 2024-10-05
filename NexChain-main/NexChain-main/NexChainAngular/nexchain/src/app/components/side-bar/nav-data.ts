import { INavbarData } from "./helper";

export const navbarData: INavbarData[]=[
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label:'Dashboard'
    },

    {
        routeLink: 'products',
        icon: 'fal fa-box-open',
        label:'Products'
    },

    {
        routeLink: 'productionquantity',
        icon: 'fal fa-tags',
        label:'Production',
        // items:[
        //     {
        //         routeLink:'productionquantity/list',
        //         label: 'List Coupens'
        //     },
        //     {
        //         routeLink:'productionquantity/create',
        //         label: 'List Create'
        //     }
        // ]
    },
    {
        routeLink: 'recipe',
        icon: 'fal fa-tags',
        label:'Recipe',
        // items:[{
        //      routeLink:'products',
        //         label: 'List Coupens'
        // }
           
        // ]
    },

    // {
    //     routeLink: 'rawmaterial',
    //     icon: 'fal fa-box-open',
    //     label:'Rawmaterial'
    // },
    // {
    //     routeLink: 'supplier',
    //     icon: 'fal fa-tags',
    //     label:'Supplier'
    // },

    {
        routeLink: 'Departments',
        icon: 'fal fa-tags',
        label:'Departments',
         items:[
            {
             routeLink:'rawmaterial',
                label: 'Add Rawmaterial'
        },
        {
            routeLink:'supplier',
               label: 'Add Supplier'
       },
       {
        routeLink:'procurement',
           label: 'Procurement'
   },
   {
    routeLink:'inventory',
       label: 'Add Inventory'
}
           
        ]
    },

    {
        routeLink: 'payment',
        icon: 'fal fa-box-open',
        label:'Payment'
    },
    {
        routeLink: 'allproducts',
        icon: 'fal fa-tags',
        label:'All Products'
    },
    {
        routeLink: 'productwarehouse',
        icon: 'fal fa-tags',
        label:'Ware Product'
    },
    {
        routeLink: 'inventory',
        icon: 'fal fa-tags',
        label:'Inventory'
    },
    {
        routeLink: 'stock',
        icon: 'fal fa-tags',
        label:'Stock'
    },
    {
        routeLink: 'ware-status',
        icon: 'fal fa-tags',
        label:'Ware Status'
    }
    // {
    //     routeLink: 'scanwarehouse',
    //     icon: 'fal fa-tags',
    //     label:'Scan Ware Product'
    // }

   
    
];
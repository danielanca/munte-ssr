import loadable from "@loadable/component";

const FAQBlock = loadable(() => import("../pages/FAQ/FAQBlock"), { ssr: true });
const PublicLayout = loadable(() => import("../layouts/public/PublicLayout"), { ssr: true });

const ProduseleNoastre = loadable(() => import("../components/OurProducts/ProduseleNoastre"), { ssr: true });
const FinishOrder = loadable(() => import("../components/CartPage1/FinishOrder"), { ssr: true });
const Blogs = loadable(() => import("../components/mini/ConstantComponents/Blogs"), { ssr: true });
const CartPage = loadable(() => import("../components/CartPage1/CartPage"), { ssr: true });
const BlogPost = loadable(() => import("../components/mini/ConstantComponents/BlogPost"), { ssr: true });
const OrderView = loadable(() => import("../components/OrderView/OrderView"), { ssr: true });
const MainNavigation = loadable(() => import("../components/Navigation/MainNavigation"), { ssr: true });
const Desprenoi = loadable(() => import("../blocks/Desprenoi"));


import { TextContentRoutes } from "./contentRoutes/contentRoutes";
import { RouteType } from "./types";


const Contact = loadable(() => import("../pages/contact/Contact"), { ssr: true });


const clearNotification = () => {
  console.log("Notifications cleared!");
};

const publicRoutes: RouteType[] = [
  {
    path: "",
    layout: PublicLayout,
    component: MainNavigation,
  },
  {
    path: "produsele-noastre",
    layout: PublicLayout,
    component: ProduseleNoastre,
  },
 
  {
    path: "finalizare-comanda",
    layout: PublicLayout,
    component: FinishOrder,
    props: { clearNotification: clearNotification },
  },
  {
    path: "saredebai",
    layout: PublicLayout,
    component: ProduseleNoastre,
  },
  {
    path: "cosulmeu",
    layout: PublicLayout,
    component: CartPage,
  },
  {
    path: "intrebari",
    layout: PublicLayout,
    component: FAQBlock,
  },
  {
    path: "blogs",
    layout: PublicLayout,
    component: Blogs,
  },
  {
    path: "/blogid/:blogLink",
    layout: PublicLayout,
    component: BlogPost,
  },

  {
    path: "/factura/:orderID",
    layout: PublicLayout,
    component: OrderView,
  },

  
  {
    path: "desprenoi",
    layout: PublicLayout,
    component: Desprenoi,
  },
  {
    path: "/contact",
    layout: PublicLayout,
    component: Contact,
  },

  ...TextContentRoutes,
];

export default publicRoutes;

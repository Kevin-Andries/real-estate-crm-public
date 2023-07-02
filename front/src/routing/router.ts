// Public views
import Home from '../templates/views/public/Home'
import FindEstate from '../templates/views/public/FindEstate'
import EstateDetails from '../templates/views/public/EstateDetails'
import Login from '../templates/views/public/Login'
import Registration from '../templates/views/public/Registration'
import AuthCallback from '../templates/views/public/AuthCallback'
import ContactUs from '../templates/views/public/ContactUs'
import AboutUs from '../templates/views/public/AboutUs'

// Private views
import Dashboard from '../templates/views/private/Dashboard'
import AddEstate from '../templates/views/private/AddEstate'
import YourProperties from '../templates/views/private/YourProperties'
import Inbox from '../templates/views/private/Inbox'
import Invoices from '../templates/views/private/Invoices'
import Settings from '../templates/views/private/Settings'

export const routes = [
    {
        name: "Home",
        path: "/",
        component: Home,
        meta: { requiresLogin: false },
    },
    {
        name: "FindEstate",
        path: "/find-estate",
        component: FindEstate,
        meta: { requiresLogin: false },
    },
    {
        name: "estateDetails",
        path: "/estate-details/:id",
        component: EstateDetails,
        meta: { requiresLogin: false },
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: { requiresLogin: false },
    },
    {
        name: "registration",
        path: "/registration",
        component: Registration,
        meta: { requiresLogin: false },
    },
    {
        name: "auth-callback",
        path: "/auth-callback",
        component: AuthCallback,
        meta: { requiresLogin: false },
    },
    {
        name: "contact-us",
        path: "/contact-us",
        component: ContactUs,
        meta: { requiresLogin: false },
    },
    {
        name: "about-us",
        path: "/about-us",
        component: AboutUs,
        meta: { requiresLogin: false },
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard,
        meta: { requiresLogin: true },
    },
    {
        name: "add-estate",
        path: "/add-estate",
        component: AddEstate,
        meta: { requiresLogin: true },
    },
    {
        name: "your-properties",
        path: "/your-properties",
        component: YourProperties,
        meta: { requiresLogin: true },
    },
    {
        name: "inbox",
        path: "/inbox",
        component: Inbox,
        meta: { requiresLogin: true },
    },
    {
        name: "invoices",
        path: "/invoices",
        component: Invoices,
        meta: { requiresLogin: true },
    },
    {
        name: "settings",
        path: "/settings",
        component: Settings,
        meta: { requiresLogin: true },
    },
];

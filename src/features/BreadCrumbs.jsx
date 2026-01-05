import { Link, useLocation } from "react-router-dom";

const SEGMENT_LABELS = {
    catalog: 'Catalog',
    reviews: 'Reviews',
    delivery: 'Delivery',
    faq: 'FAQ',
    about: 'About',
    profile: 'Profile'
};

const humanize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const BreadCrumbs = ({ item = null }) => {
    const { pathname } = useLocation();

    const segments = pathname.split('/').filter(Boolean);
    const crumbs = [];
    let totalPath = '';

    crumbs.push({ path: '/', label: 'Home' });

    segments.forEach((segment, idx) => {
        totalPath += `/${segment}`;

        const isLast = idx === segments.length - 1;
        const baseSegment = SEGMENT_LABELS[segment];
        const label = isLast && item?.name
            ? item.name
            : (baseSegment || humanize(segment));

        crumbs.push({ path: totalPath, label });
    });

    return (
        <nav className="container w-full text-lg text-gray-400 mt-[2rem]">
            {crumbs.map((crumb, idx) => {
                const isLast = idx === crumbs.length - 1;

                return (
                    <span key={crumb.path} className="inline-flex items-center">
                        {idx > 0 && <span className="mx-2">/</span>}
                        {isLast ? (
                            <span className="text-gray-200">{crumb.label}</span>
                        ) : (
                            <Link to={crumb.path} className="hover:text-gray-200">{crumb.label}</Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};
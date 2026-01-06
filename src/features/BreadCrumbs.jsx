import { Link, useLocation } from "react-router-dom";

const humanize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const BreadCrumbs = ({item = null, profile = null}) => {
    const {pathname} = useLocation();
    const segments = pathname.split('/').filter(Boolean);
    
    const crumbs = [];
    crumbs.push({path: '/', label: 'Home'});

    let totalPath = '';
    segments.forEach((segment, index) => {
        totalPath += `/${segment}`;
        const isLast = index === segments.length - 1;
        const humanizedPathSegment = humanize(segment)

        const label = isLast && 
            (item?.name ? 
                item.name : 
                    profile?.name ? 
                        profile.name :
                            humanizedPathSegment
            );
        if (!label) { // if no item name, use humanized segment
            crumbs.push({path: totalPath, label: humanizedPathSegment});
        } else {
            crumbs.push({path: totalPath, label});
        }
    })

    return (
        <nav className="container w-full text-lg text-gray-400 mt-[2rem]">
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                    <span key={crumb.path} className="inline-flex items-center">
                        {index > 0 && <span className="mx-2">/</span>}
                        {isLast ? 
                            <span className="text-gray-200">{crumb.label}</span>
                        : <Link to={crumb.path} className="hover:text-gray-200">{crumb.label}</Link>}
                    </span>
                )
            })}
        </nav>
    )    
}
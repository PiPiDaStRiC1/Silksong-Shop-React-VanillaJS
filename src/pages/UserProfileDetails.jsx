import { useParams } from "react-router-dom";
import {BreadCrumbs} from '@/features/index'
import { useData } from "@/hooks/useData";
import { ReviewerProfile } from "@/components/ui/index";

export default function UserProfileDetails() {
    const { reviews, error, isLoading } = useData();
    const {userId} = useParams();

    const user = reviews.find(r => String(r.id) === String(userId));
    
    return (
        <>
            {isLoading ? 
                <div className="text-center py-12 text-gray-400">
                    <p>Loading reviewer...</p>
                </div> : 
                    error.length ? 
                        <div className="text-center py-12 text-red-500">
                            <p>Failed to load reviewer</p>
                        </div> : 
                                <section className="container w-full text-white">
                                    <div className="container w-full sm:px-6 py-8">
                                        <BreadCrumbs profile={user}/>
                                        <ReviewerProfile user={user}/>
                                    </div>
                                </section>
            }
        </>
    );
};
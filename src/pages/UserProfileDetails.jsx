import { useParams } from "react-router-dom";
import {BreadCrumbs} from '@/features/index'
import { useData } from "@/hooks/useData";
import { useMemo } from "react";
import { ReviewerProfile } from "@/components/ui/index";

export const UserProfileDetails = () => {
    const { reviews, error, isLoading } = useData();
    const {userId} = useParams();

    const user = useMemo(() => reviews.find(r => String(r.id) === String(userId)), [reviews, userId]);
    
    return (
        <>
        {isLoading ? 
            <div className="text-center py-12 text-gray-400">
                <p>Loading catalog...</p>
            </div> : 
                error.length ? 
                    <div className="text-center py-12 text-red-500">
                        <p>Failed to load catalog</p>
                    </div> : 
                            <section className="container w-full text-white">
                                <div className="container w-full px-6 py-8">
                                    <BreadCrumbs profile={user}/>
                                    <ReviewerProfile user={user}/>
                                </div>
                            </section>
        }
        </>
    );
};
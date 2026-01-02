import {memo} from 'react';

export const StepCircle = memo(({step, currentStep, setCurrentStep}) => {
    const Icon = step.icon;
    const isCompleted = currentStep > step.id;
    const isCurrent = currentStep === step.id;
    
    return (
        <div className="relative flex flex-col items-center gap-3 z-10">
            <button
                onClick={() => setCurrentStep(step.id)}
                className={`
                    h-14 w-14 cursor-pointer rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 border-violet-400 shadow-lg shadow-violet-500/30' 
                        : isCurrent 
                        ? 'bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border-violet-400 shadow-lg shadow-violet-500/20 backdrop-blur' 
                        : 'bg-neutral-900 border-white/10'
                    }
                `}
            >
                <Icon className={`h-6 w-6 ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}`} />
            </button>
            <span className={`
                text-sm font-medium transition-colors
                ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}
            `}>
                {step.title}
            </span>
        </div>
    );
});
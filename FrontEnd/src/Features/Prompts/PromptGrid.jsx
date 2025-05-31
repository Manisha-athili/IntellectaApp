
import PromptCard from '../../Components/PromptCard';


export default function PromptGrid({prompts}){
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-8'>

            {
                prompts.map((prompt,idx)=>(
                    <PromptCard 
                    key = {prompt._id || idx}
                    title={prompt.title}
                    stars={prompt.stars || 0}
                    comments={prompt.comments || 0}
                    shares={prompt.shares || 0}
                    />
                ))
            }
        </div>
    )
}
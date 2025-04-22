import { useMediaQuery } from '@mui/material';
import './Marquee.css'

interface Props {
    count: number;
    text: string;
}

function Marquee({ count, text }: Props) {
    const reduced_motion = useMediaQuery("(prefers-reduced-motion)");

    const items = Array.from(".".repeat(count));
    
    return (
        <>
            <div className="marquee-wrapper">
                { reduced_motion ? 
                    <div className="marquee-item">
                        <p>{text}</p>
                    </div>
                :
                    items.map(
                        (item, index) => <div
                            key={item + index}
                            className='marquee-item'
                            style={{
                                animationDelay: `calc(30s / ${count} * (${count} - ${index}) * -1)`,
                                left: `max(calc(400px * ${count}), 100%)`
                            }}
                        >
                            <p>{text}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Marquee;
import React from 'react';
import "./QuickLinkAboutUs.css";
import { useNavigate } from 'react-router-dom';

export default function QuickLinkAboutUs() {

    const navigate = useNavigate();
    
    return (
        <div id='quickLinksAboutUsMain'>
            <div style={{ height : '15vh'}}></div>
            {/* --------------QUICK LINKS---------------- */}
            <div id='quickLinksBoxMain'>
                <div onClick={() => navigate("/demoLink")} className='quickLinksBoxContents'>
                    Join our Discord Server
                </div>
                <div onClick={() => navigate("/demoLink")} className='quickLinksBoxContents'>
                    Join CodeForces Group
                </div>
                <div onClick={() => navigate("/notice-board")} className='quickLinksBoxContents'>
                    Visit our Notice Board
                </div>
                <div onClick={() => navigate("/demoLink")} className='quickLinksBoxContents'>
                    Visit our Education Section
                </div>
            </div>
            {/* ------------------END-------------------- */}
            <div style={{ height : '15vh'}}></div>
            {/* --------------ABOUT US---------------- */}
            <div id='aboutUsMain'>
                <div id='aboutUsTitleMain'>
                    About Us
                </div>
                <div id='aboutUsContentMain'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad quos nam sed dicta quis impedit, perspiciatis repellat ex soluta sunt praesentium tempore maxime nemo tempora dolor saepe iusto obcaecati.
                    Quam ionem, itaque veritatis dolore mollitia illum nam similique minus repellendus, rem non cupiditate commodi dolor voluptatum distinctio sint obcaecati numquam? Dicta neque porro ab.
                    Aliquid qui dicta obcaecat Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, mollitia. Omnis eligendi delectus quod consectetur dolores distinctio, quae animi laudantium veniam amet dolorum, hic tempore fuga ullam, vero impedit ratione?
                    quae corporis fuga dolores necessitatibus ipsa voluptates pariatur deleniti assumenda aliquid ab id nostrum, neque, accusamus fugit ut? Culpa at suscipit ipsa ipsum natus obcaecati?
                    Illum quam voluptatibus dolor. Magni nostrum placeat veritatis, necessitatibus eos, maxime provident quo voluptate laboriosam repellat quos quidem a asperiores commodi officia aspernatur quasi cumque magnam sunt! Reprehenderit, ipsa saepe.
                    Tempora, commodi illum excepturi natus cumque quod atque, possimus molestias a debitis libero ullam, animi rem accusantium? Eligendi non veritatis explicabo sunt beatae porro minus suscipit.
                    Necessitatibus atque aperiam hic quae alias blanditiis maiores iusto minima labore consequatur, dolorum nam excepturi quo adipisci praesentium, commodi architecto maxime eaque ab est! Voluptatem ex veniam sed molestias exercitationem. i ut, laudantium dolor sint odio natus, nulla quaerat omnis delectus molestias ipsa. Recusandae inventore sed id consectetur amet, iusto eum eaque, voluptates atque facere nesciunt optio.
                    Beatae nisi, architecto at cupiditate ipsa facere incidunt expedita iusto. Nihil facere officiis quis possimus neque laudantium, libero explicabo recusandae corrupti sequi quae velit id ducimus cum, fugiat ratione reprehenderit.
                </div>
            </div>
            {/* ------------------END-------------------- */}
        </div>
    )
}

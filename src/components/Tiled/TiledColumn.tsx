import { TiledSearchItem, TiledStructures, Breadcrumb } from "./types";
import { Tooltip } from "react-tooltip";
import { cn } from "@/lib/utils";
import Button from "../Button";

type TiledColumnProps = {
    data: TiledSearchItem<TiledStructures>[];
    onItemClick: Function;
    index: number;
    breadcrumbs: Breadcrumb[];
    handleSelectClick?: Function;
    className?: string;
    showTooltip?: boolean;
};



const folder = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"></path></svg>;
const brackestSqaure = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M48,48V208H80a8,8,0,0,1,0,16H40a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16ZM216,32H176a8,8,0,0,0,0,16h32V208H176a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Z"></path></svg>;
const table = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"></path></svg>;
const question = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>;

const renderIcon = (structureFamily:string) => {
    var icon = question;
    var lineColor = '';
    if (structureFamily === 'array' || structureFamily === 'awkward' || structureFamily === 'sparse') {
        icon = brackestSqaure;
    }
    if (structureFamily === 'table') {
        icon = table;
    }
    if (structureFamily === 'container') {
        icon = folder;
        lineColor = 'text-sky-700';
    }

    return (
        <div className={`w-6 aspect-square flex-shrink-0 ${lineColor}`}>{icon}</div>
    )
};

export function TiledColumn ({data, index, onItemClick, breadcrumbs, handleSelectClick, className, showTooltip=true}: TiledColumnProps) {

    return (
        <div className={cn("flex flex-col-reverse border-r border-r-slate-300 min-w-56 w-fit max-w-xs px-4 h-auto pt-2", className)}>
{/*             <div className={`${breadcrumbs.length  === index ? '' : 'hidden'} peer m-auto py-2 mt-1 w-full text-center border-t`}>
                <Button text="Select Container" size="small" cb={handleSelectClick ? ()=>handleSelectClick(data) : () =>{}}/>
            </div>     */}        
            <ul className="scrollbar-always-visible overflow-y-auto flex-grow peer-hover:text-slate-500 peer-hover:border peer-hover:border-blue-400 rounded-md">
                {data.map((item:TiledSearchItem<TiledStructures>) => {
                    let id = item.id+index;
                    return (
                        <li 
                            className={`${ (breadcrumbs.length > index) && breadcrumbs[index].label === item.id ? 'bg-sky-200 hover:bg-sky-300' : 'hover:bg-sky-300'} flex space-x-2 px-2 rounded-sm hover:cursor-pointer relative`} 
                            key={id}
                            onClick={()=>onItemClick(item)}
                            id={id}
                        >
                            {renderIcon(item.attributes.structure_family)}
                            <p className="truncate max-w-full">{item.id}</p>
                            {item.attributes.structure_family === 'container' ? <p className="absolute right-1 text-slate-500">&gt;</p> : ''}
                            {(handleSelectClick && showTooltip) &&
                                <Tooltip 
                                    children={
                                        <Button 
                                            text="Select" 
                                            size="small" 
                                            cb={(event:React.MouseEvent)=> {
                                                event.stopPropagation();
                                                handleSelectClick(item);
                                            }
                                        
                                        }/>
                                    } 
                                    anchorSelect={`#${id}`} 
                                    clickable 
                                    delayShow={600}
                                    opacity={1} 
                                    offset={10} 
                                    place="top" 
                                    variant="info" 
                                    style={{'maxWidth' : "500px", margin:"0", padding:"0.3rem", 'height': 'fit-content', backgroundColor: "#e9e8eb", borderWidth: "1px", borderRadius: "1rem"}}
                                />
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
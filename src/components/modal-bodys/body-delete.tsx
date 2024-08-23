import { Button } from "../ui/button"

export default function BodyDelete({className=""}: {className?: string}){
    return(<>
        <Button className={className} variant={"destructive"}>Удалить</Button>
    </>)
}


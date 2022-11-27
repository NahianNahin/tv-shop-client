import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} -- TV Shop`;
    },[title])
}

export default useTitle;
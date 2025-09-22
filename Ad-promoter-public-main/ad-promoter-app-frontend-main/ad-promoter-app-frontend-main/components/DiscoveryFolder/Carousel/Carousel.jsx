import { CarouselContainer } from "./style"

const Carousel = (props) => {
    const {children} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    useEffect(() => {
        setLength(children.length)
    }, [children])
  return (
    <CarouselContainer>
        <div className="carousel-wrapper">
            <button className="left-arrow">
                &lt;
            </button>
            <div className="carousel-content-wrapper">
                <div className="carousel-content">
                    {children}
                </div>
            </div>
            <button className="right-arrow">
                &gt;
            </button>
        </div>
    </CarouselContainer>
  )
}

export default Carousel
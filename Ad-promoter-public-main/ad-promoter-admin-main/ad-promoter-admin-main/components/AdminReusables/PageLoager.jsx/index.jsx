import { Oval } from "react-loader-spinner";
import { Loader } from "./style";

const PageLoader = ({ className, width = 80, height = 80 }) => {
	return (
		<Loader>
			<Oval
				height={height}
				width={width}
				color="#4F00CF"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="#4F00CF"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</Loader>
	);
};

export default PageLoader;
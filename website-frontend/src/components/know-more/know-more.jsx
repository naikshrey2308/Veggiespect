import { memo } from "react";
import "./know-more.css"

function KnowMore() {
    return (
        <div className="position-relative">
        <div id="know-more" className="know-more pb-5 text-center">
            <div className="p-3 br-10 bg-white border shadow">
                <h4 className="text-center text-primary my-5">
                    What is Veggiespect?
                </h4>
                <p className="mt-3 mb-5 pb-3 text-secondary mx-3 px-3 font-jost">
                    Veggiespect is an online tool that is designed with the primary goal of helping our hard working farmers to be more productive in growing crops. This is a free tool that people, especially farmers, can use to detect if their crops are suffering from any diseases which can harm the crops. By just uploading a picture of the leaf, and waiting for a few seconds, the results and the confidence in the results would be presented to the farmers, free of cost! This instantaneous solution to a persisting problem would increase the productivity of crops much more.
                </p>
            </div>
        </div>
        </div>
    );
}

export default memo(KnowMore);
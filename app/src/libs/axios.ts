import axios from "axios";
import setting from "$setting"

export default axios.create(
    {
        baseURL:setting.API_URI_BASE
    }
)
const useFeatureApi = () => {
    const { createRequest } = useAPI({
        propagateErrors: true,
    });


const createFeature = async (eatureId: string) => {
    const req = createRequest(
        `api/admin/features`,
        { method: 'POST'}
    );

    try {
        const res = await makeRequest(req.caller, req.id);

        return res;
    } catch (e) {
        throw e;
    }
};

};

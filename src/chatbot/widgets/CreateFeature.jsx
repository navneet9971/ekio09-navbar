
import { Button } from "semantic-ui-react";


const CreateFeature = ({ actionProvider }) => {
    

    const randomWords = ["crazy" , "banana", "hammock", "castle"]

    const featureToggleName = 
    randomWords[Math.floor(Math.random() * randomWords.length)] +
    randomWords[Math.floor(Math.random() * randomWords.length)];


    const handleCreate = async () => {
        const featureToggle = {
            description: '',
            enabled: true,
            name: featureToggleName,
            project: 'default',
            stale: false,
            strategies: [{ name: 'default', parameters: {} }],
            type: 'release',
            variants: [],
        }
        try{
            CreateFeature(featureToggle);
            actionProvider.handleCreateSuccess();
        }catch (e) {
            console.log(e);
        }
    };

    return <div>
        <p style={{ marginBottom: "irem" }}>Create a feature toggle names {featureToggleName}</p>
        <Button variant= "contained" color="primary" onclick={handleCreate}>Create feature</Button>
    </div>
}

export default CreateFeature;
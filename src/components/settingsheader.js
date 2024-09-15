const SettingsHeader = () => {
    return (<>
        <div className="nav-header1"
            style={
                {borderBottom: '1px solid #ccc'}
        }>
            <div className="steps-settings">
                <span className="set-col">Settings</span>
                <span className="material-icons">
                    chevron_right</span>
                <span className="set-pro">Profile</span>
            </div>
            <div className="settings-header">
                <h2>Settings</h2>
                <span>Manage your settings here</span>
            </div>
        </div>
    </>);
}

export default SettingsHeader;

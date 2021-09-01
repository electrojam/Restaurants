import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updateEmail, updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()) {
            return
        }

        // setLoading(true)
        // const resultreauthenticate = await reauthenticate(password)
        // if(!resultreauthenticate.statusResponse) {
        //     setErrorPassword("Contraseña incorrecta.")
        //     setLoading (false)
        //     return
        // }

        // const resultupdateEmail = await updateEmail(newEmail)
        // setLoading (false)

        // if(!resultupdateEmail.statusResponse) {
        //     setErrorEmail("No se puede puede cambiar por este correo, ya está en uso por otro usuario.")
        //     return
        // }

        // setReloadUser(true)
        // toastRef.current.show("Se ha actualizado el email.", 3000)
        // setShowModal(false)  
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar tu contraseña.")
            isValid = false
        }
        
        if(size(newPassword) < 6) {
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(size(confirmPassword) < 6) {
            setErrorConfirmPassword("Debes ingresar una nueva confirmación de tu contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(newPassword !== confirmPassword) {
            setErrorNewPassword("La nueva contraseña y la confirmación no son iguales.")
            setErrorConfirmPassword("La nueva contraseña y la confirmación no son iguales.")
            isValid = false
        }

        if(newPassword === currentPassword) {
            setErrorCurrentPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorNewPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa tu contraseña actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type= "material-community"
                        name= { showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type= "material-community"
                        name= { showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu confirmación de nueva contraseña."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type= "material-community"
                        name= { showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})

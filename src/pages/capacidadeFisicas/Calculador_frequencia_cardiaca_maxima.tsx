
import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Form } from "@unform/web";
import * as yup from 'yup';
import { IFormErrorsCustom, TextFieldCustom, useCustomForm } from '../../components/forms';
import { TextSelectCustom } from '../../components/forms/TextSelectCustom';


export interface FormValues {
    nome: string;
    idade: string;
    etnia: string;
    estatura: string;
    peso: string;
    sexo: string;
    percentualAlvoTreinamentoMin: string;
    percentualAlvoTreinamentoMax: string;
    nivelCondicionamento: string;
    fcRepouso: string;

}

const formValidateSchema: yup.Schema<FormValues> = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    idade: yup.string().required("Campo obrigatório"),
    etnia: yup.string().required("Campo obrigatório"),
    peso: yup.string().required("Campo obrigatório"),
    sexo: yup.string().required("Campo obrigatório"),
    percentualAlvoTreinamentoMin: yup.string().required("Campo obrigatório"),
    fcRepouso: yup.string().required("Campo obrigatório"),
    percentualAlvoTreinamentoMax: yup.string().required("Campo obrigatório"),
    nivelCondicionamento: yup.string().required("Campo obrigatório"),
    estatura: yup.string()
        .matches(/^\d+(\.\d{1,2})?$/, 'Somente números e ponto são permitidos para representar números decimais.')
        .required("Campo obrigatório"),

})

export const Calculador_frequencia_cardiaca_maxima: React.FC = () => {

    // const [score1, setScore1] = useState(0);
    // const [result, setResult] = useState('');

    const { formRef, save } = useCustomForm();

    // const avaliacao: { [key: number]: string } = {
    //     1: 'Atividades Moderadas',
    //     2: 'Controle do Peso',
    //     3: 'Aeróbio',
    //     4: 'Liminar Anaeróbio',
    //     5: 'Esforço Máximo',
    // }


    // useEffect(() => {

    //     if (score1) {
    //         setResultAvaliacao(avaliacao[score1]);
    //     }


    // }, [score1])


    const handSave = (dados: FormValues) => {

        formValidateSchema.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                //fazer os calculos aquii
                console.log(dadosValidados.estatura)


            })
            .catch((errors: yup.ValidationError) => {
                const ValidationError: IFormErrorsCustom = {}

                errors.inner.forEach(error => {
                    if (!error.path) return;
                    ValidationError[error.path] = error.message;
                });
                console.log(errors.errors);
                formRef.current?.setErrors(ValidationError)
            })
    };

    return (
        <Container>

            <Form ref={formRef} onSubmit={(dados) => handSave(dados)}>
                <Box margin={1} display='flex' flexDirection='column' >
                    <Grid container direction='column' padding={2} spacing={2}>

                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="Nome"
                                name="nome"
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="Idade"
                                name="idade"
                                disabled={false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="Peso"
                                name="peso"
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextSelectCustom
                                fullWidth
                                name="etnia"
                                menu={[
                                    {
                                        nome: 'Mestiço',
                                        id: '1'
                                    },
                                    {
                                        nome: 'Branco',
                                        id: '2'
                                    },
                                    {
                                        nome: 'Negro',
                                        id: '3'
                                    },
                                    {
                                        nome: 'Oriental',
                                        id: '4'
                                    },
                                    {
                                        nome: 'Indio',
                                        id: '6'
                                    },
                                    {
                                        nome: 'Espánico',
                                        id: '8'
                                    }
                                ]}
                                disabled={false}
                                label="Etnia"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="Estatura"
                                name="estatura"
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="F.C. de Repouso"
                                name="fcRepouso"
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextSelectCustom
                                fullWidth
                                name="nivelCondicionamento"
                                menu={[
                                    {
                                        nome: 'Sedentário',
                                        id: '1'
                                    },
                                    {
                                        nome: 'Ativo',
                                        id: '2'
                                    },
                                    {
                                        nome: 'Atleta',
                                        id: '3'
                                    },
                                ]}
                                disabled={false}
                                label="Nível de Condicionamento"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="Percentual Alvo de Treinamento Mínimo:"
                                name="percentualAlvoTreinamentoMax"
                                disabled={false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldCustom
                                fullWidth
                                label="Percentual Alvo de Treinamento Máximo:"
                                name="percentualAlvoTreinamentoMin"
                                disabled={false}
                            />
                        </Grid>

                    </Grid>
                </Box>
            </Form>

            <button onClick={save}>Calcular</button>
            {/* {result} */}
        </Container>
    );
};